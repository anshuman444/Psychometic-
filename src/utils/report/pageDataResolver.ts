/**
 * Page Data Resolver
 * 
 * Responsible for extracting and formatting the precise data slice from the 
 * FullReportPayload required for a specific page (1-30). Handles missing data 
 * gracefully and supports lazy loading requirements.
 */

import type { FullReportPayload } from './reportDataAssembler';

export interface PageDataResponse<T> {
  pageId: number;
  isDataComplete: boolean;
  missingDependencies: string[];
  data: T;
}

export class PageDataResolver {
  
  /**
   * Resolves data for Page 3: Student Intelligence Fingerprint
   */
  static resolveFingerprintPage(payload: FullReportPayload): PageDataResponse<any> {
    const missing: string[] = [];
    if (!payload.dimensions || payload.dimensions.length !== 22) {
      missing.push('22 Dimension Scores');
    }

    return {
      pageId: 3,
      isDataComplete: missing.length === 0,
      missingDependencies: missing,
      data: {
        dimensions: payload.dimensions,
        studentId: payload.studentId
        // The fingerprintVisualization engine will consume this to generate the actual UI/PDF hash
      }
    };
  }

  /**
   * Resolves data for Page 2: Executive Summary
   */
  static resolveExecutiveSummaryPage(payload: FullReportPayload): PageDataResponse<any> {
    const missing: string[] = [];
    if (!payload.readinessScore) missing.push('Readiness Score');
    if (!payload.strengths || payload.strengths.length === 0) missing.push('Top Strengths');
    
    return {
      pageId: 2,
      isDataComplete: missing.length === 0,
      missingDependencies: missing,
      data: {
        readinessScore: payload.readinessScore,
        strengths: payload.strengths,
        branding: payload.branding
      }
    };
  }

  /**
   * Universal resolver switch
   */
  static resolvePage(pageId: number, payload: FullReportPayload): PageDataResponse<any> {
    switch (pageId) {
      case 2:
        return this.resolveExecutiveSummaryPage(payload);
      case 3:
        return this.resolveFingerprintPage(payload);
      // Cases 4-30 implemented similarly...
      default:
        return {
          pageId,
          isDataComplete: false,
          missingDependencies: ['Not Implemented'],
          data: {}
        };
    }
  }
}
