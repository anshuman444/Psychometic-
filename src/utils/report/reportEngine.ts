/**
 * Master Report Engine
 * 
 * Orchestrates the full lifecycle of report generation: assembling the data payload,
 * resolving individual page dependencies, and invoking the renderer for all 30 pages.
 */

import { ReportDataAssembler } from './reportDataAssembler';
import type { BrandingProfile } from './reportDataAssembler';
import { PageDataResolver } from './pageDataResolver';
import { PageRendererEngine } from './pageRendererEngine';
import type { RenderTarget } from './pageRendererEngine';
import React from 'react';

export class ReportEngine {
  
  /**
   * Initializes a full 30-page report generation run.
   */
  static async generateReport(
    studentId: string, 
    sessionId: string, 
    targetMedium: RenderTarget,
    schoolBrandingOverride?: Partial<BrandingProfile>
  ): Promise<React.ReactElement[]> {
    
    // 1. Fetch and Assemble the Full Payload
    const payload = await ReportDataAssembler.assembleReportPayload(
      studentId, 
      sessionId, 
      schoolBrandingOverride
    );

    const renderedPages: React.ReactElement[] = [];

    // 2. Iterate through the exact 30 pages specified in the Report Structure schema
    const totalPages = 30; // Corresponds to report_structure.json

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      // 3. Resolve exact dependencies for this specific page
      const pageData = PageDataResolver.resolvePage(pageNum, payload);
      
      // 4. Render the page using the target context (PDF vs Web)
      const renderedPage = PageRendererEngine.renderPage(pageData, targetMedium);
      
      if (renderedPage) {
        renderedPages.push(renderedPage);
      }
    }

    return renderedPages;
  }
}
