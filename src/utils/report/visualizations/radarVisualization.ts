/**
 * Radar Visualization Engine
 * 
 * Transforms dimension data into polar coordinates suitable for rendering
 * in Recharts (DOM) or a static SVG generation engine (PDF).
 */

import config from '../../../data/report/visualizationConfig.json';
import type { RenderTarget } from '../pageRendererEngine';

export interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

export class RadarVisualizationEngine {
  
  /**
   * Transforms the 22 normalized dimensions into radar chart data.
   */
  static transformData(dimensions: any[]): RadarDataPoint[] {
    // Expected to group by category (Personality, Learning, Skills, Career)
    // and sort consistently so the radar polygon retains a standard shape across users.
    
    return dimensions.map(d => ({
      subject: d.dimensionId.split('_').pop() || d.dimensionId,
      A: d.normalizedScore,
      fullMark: 100
    }));
  }

  /**
   * Generates SVG props based on the rendering context.
   */
  static getRenderConfig(target: RenderTarget) {
    const isPdf = target === 'PDF' || target === 'Print_Export';
    
    return {
      fillOpacity: isPdf ? 0.8 : config.radar.fillOpacity,
      strokeWidth: config.radar.strokeWidth,
      animationDuration: isPdf ? config.pdfOverrides.animationDuration : config.radar.animationDuration,
      strokeColor: config.colors.primary,
      fillColor: config.colors.secondary
    };
  }
}
