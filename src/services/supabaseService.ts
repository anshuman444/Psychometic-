/**
 * Supabase Data Service
 * 
 * Thin data access layer wrapping all Supabase operations.
 * Handles saving and retrieving assessment results and reports.
 * 
 * Uses the user_id from the parent VidyaLoop platform as the foreign key —
 * NOT from Supabase auth.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// =============================================
// TypeScript interfaces for database rows
// =============================================

export interface AssessmentResultRow {
  id: string;
  user_id: string;
  assessment_version: string;
  status: 'in_progress' | 'completed' | 'flagged';
  readiness_score: number;
  success_score: number;
  fingerprint_hash: string;
  dimension_scores: any;
  theme_scores: any;
  career_scores: any;
  strengths: any;
  hidden_strengths: any;
  blind_spots: any;
  motivation_profile: any;
  roadmap: any;
  raw_responses: any;
  quality_metrics: any;
  created_at: string;
}

export interface ReportRow {
  id: string;
  user_id: string;
  assessment_result_id: string;
  report_json: any;
  pdf_url: string | null;
  report_version: string;
  generated_at: string;
}

// =============================================
// Assessment Result Operations
// =============================================

/**
 * Saves a completed assessment result to Supabase.
 * Returns the created row's ID.
 */
export async function saveAssessmentResult(
  userId: string,
  result: Omit<AssessmentResultRow, 'id' | 'user_id' | 'created_at'>
): Promise<{ id: string } | null> {
  if (!isSupabaseConfigured()) {
    console.warn('[SupabaseService] Not configured — returning mock result ID');
    return { id: 'mock-result-' + Date.now() };
  }

  const { data, error } = await supabase
    .from('assessment_results')
    .insert({
      user_id: userId,
      ...result,
    })
    .select('id')
    .single();

  if (error) {
    console.error('[SupabaseService] Error saving assessment result:', error);
    throw new Error(`Failed to save assessment: ${error.message}`);
  }

  return data;
}

/**
 * Retrieves the most recent completed assessment result for a user.
 */
export async function getLatestAssessmentResult(
  userId: string
): Promise<AssessmentResultRow | null> {
  if (!isSupabaseConfigured()) {
    console.warn('[SupabaseService] Not configured — returning null');
    return null;
  }

  const { data, error } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found
    console.error('[SupabaseService] Error fetching assessment:', error);
    return null;
  }

  return data;
}

/**
 * Retrieves all assessment results for a user (history).
 */
export async function getAssessmentHistory(
  userId: string
): Promise<AssessmentResultRow[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const { data, error } = await supabase
    .from('assessment_results')
    .select('id, user_id, status, readiness_score, success_score, fingerprint_hash, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[SupabaseService] Error fetching history:', error);
    return [];
  }

  return (data || []) as AssessmentResultRow[];
}

// =============================================
// Report Operations
// =============================================

/**
 * Saves a generated report to Supabase.
 */
export async function saveReport(
  userId: string,
  assessmentResultId: string,
  reportJson: any,
  pdfUrl?: string
): Promise<{ id: string } | null> {
  if (!isSupabaseConfigured()) {
    console.warn('[SupabaseService] Not configured — returning mock report ID');
    return { id: 'mock-report-' + Date.now() };
  }

  const { data, error } = await supabase
    .from('reports')
    .insert({
      user_id: userId,
      assessment_result_id: assessmentResultId,
      report_json: reportJson,
      pdf_url: pdfUrl || null,
    })
    .select('id')
    .single();

  if (error) {
    console.error('[SupabaseService] Error saving report:', error);
    throw new Error(`Failed to save report: ${error.message}`);
  }

  return data;
}

/**
 * Retrieves the most recent report for a user.
 */
export async function getLatestReport(
  userId: string
): Promise<ReportRow | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('user_id', userId)
    .order('generated_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('[SupabaseService] Error fetching report:', error);
    return null;
  }

  return data;
}
