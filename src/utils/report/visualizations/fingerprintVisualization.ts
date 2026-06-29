/**
 * Fingerprint Visualization Engine
 * 
 * Transforms the 22 Dimension Signature into a complex, visually stunning 
 * "DNA Profile" SVG mapping. This is the flagship visual of the report.
 */

import config from '../../../data/report/visualizationConfig.json';

export interface FingerprintNode {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
}

export class FingerprintVisualizationEngine {
  
  /**
   * Generates exact SVG coordinates for the 22 nodes arrayed in a double-helix or circular spiral pattern.
   * Transforms raw 0-100 scores into physical radii and offsets.
   */
  static generateSVGLayout(dimensions: any[], baseColorHex: string): FingerprintNode[] {
    const nodes: FingerprintNode[] = [];
    const centerX = config.fingerprint.svgWidth / 2;
    const centerY = config.fingerprint.svgHeight / 2;
    
    // Sort deterministically
    const sorted = [...dimensions].sort((a, b) => a.dimensionId.localeCompare(b.dimensionId));

    sorted.forEach((dim, index) => {
      // Golden angle spiral distribution
      const angle = index * 137.5 * (Math.PI / 180); 
      // Distance from center correlates with score tier
      const radiusOffset = (dim.normalizedScore / 100) * 50; 
      const r = (config.fingerprint.baseRadius * (index / sorted.length)) + radiusOffset;

      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      
      // Size of node correlates with score
      const nodeRadius = 3 + (dim.normalizedScore / 20);

      nodes.push({
        id: dim.dimensionId,
        x,
        y,
        radius: nodeRadius,
        color: baseColorHex // In a full implementation, vary opacity based on score
      });
    });

    return nodes;
  }
}
