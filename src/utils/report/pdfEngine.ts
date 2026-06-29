import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * PDF Generation Engine (Client-side)
 * 
 * Captures individual logical blocks (marked with data-pdf-block="true") 
 * and adds them sequentially to the PDF, creating new pages as needed.
 * This completely prevents elements (like dimension cards) from being sliced in half!
 */
export async function exportReportToPDF(elementId: string, studentName: string): Promise<void> {
  const container = document.getElementById(elementId);
  if (!container) {
    throw new Error(`Element with id ${elementId} not found.`);
  }

  // Build a clean filename from the student name
  const safeName = studentName.replace(/[^a-zA-Z0-9_\- ]/g, '').trim().replace(/\s+/g, '_') || 'Student';
  const fileName = `VidyaLoop_Report_${safeName}.pdf`;

  // 1. Temporarily modify styling to lock layout for capture
  const originalStyle = container.getAttribute('style') || '';
  container.style.width = '1200px';
  container.style.padding = '40px';
  container.style.background = '#F9FAFB';

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 30; // pixels
    const usableWidth = pdfWidth - margin * 2;
    
    // Load logo image as base64 and keep its original aspect ratio
    const loadLogoData = (): Promise<{ url: string; width: number; height: number } | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = '/logo.png';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve({
              url: canvas.toDataURL('image/png'),
              width: img.width,
              height: img.height
            });
          } else {
            resolve(null);
          }
        };
        img.onerror = () => resolve(null);
      });
    };
    const logoData = await loadLogoData();

    // Helper to paint page background and header
    const paintPage = () => {
      // 1. Fill background
      pdf.setFillColor('#F9FAFB');
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
      
      // 2. Draw Logo proportionally
      if (logoData) {
        const logoHeight = 22;
        const logoWidth = (logoData.width / logoData.height) * logoHeight;
        pdf.addImage(logoData.url, 'PNG', margin, 20, logoWidth, logoHeight);
      }
    };

    paintPage();
    let currentY = 65; // Start content below the logo

    // 2. Unhide extended PDF content
    const extendedContent = document.getElementById('pdf-extended-content');
    if (extendedContent) {
      extendedContent.style.display = 'block';
      // Give browser time to complete layout recalculation and image decoding
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 3. Find all unbreakable blocks
    const blocks = Array.from(container.querySelectorAll('[data-pdf-block="true"]')) as HTMLElement[];
    
    if (blocks.length === 0) {
      console.warn('No elements marked with data-pdf-block="true". Falling back to legacy capture.');
      // Legacy capture for fallback
      const canvas = await html2canvas(container, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const renderHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let heightLeft = renderHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, renderHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, renderHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }
    } else {
      // Helper to get a sliced image from a source canvas
    const getCanvasSlice = (sourceCanvas: HTMLCanvasElement, yOffset: number, sliceHeight: number): string => {
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = sourceCanvas.width;
      sliceCanvas.height = sliceHeight;
      const ctx = sliceCanvas.getContext('2d');
      if (ctx) {
        // Draw the specific slice from the source canvas
        ctx.drawImage(
          sourceCanvas,
          0,
          yOffset,
          sourceCanvas.width,
          sliceHeight,
          0,
          0,
          sourceCanvas.width,
          sliceHeight
        );
      }
      return sliceCanvas.toDataURL('image/png');
    };

    // 4. Render blocks sequentially
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        
        // Render block to canvas
        const canvas = await html2canvas(block, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: block.dataset.pdfBg || '#F9FAFB', // MUST be solid color
        });
        
        // Calculate dimensions in PDF points
        const renderWidth = usableWidth;
        const renderHeight = (canvas.height / 2 * renderWidth) / (canvas.width / 2);
        
        // Scale ratio to convert PDF points to canvas pixels
        const scaleRatio = canvas.width / renderWidth;
        
        // Check if block fits on the current page
        const forceNewPage = block.dataset.pdfNewPage === 'true';
        const scaleToFit = block.dataset.pdfScaleToFit === 'true';
        const fitsOnCurrentPage = currentY + renderHeight <= pdfHeight - margin;
        
        if ((forceNewPage && currentY > 65) || (!fitsOnCurrentPage && currentY > 65)) {
          pdf.addPage();
          paintPage();
          currentY = 65;
        }
        
        if (scaleToFit) {
          let finalRenderWidth = renderWidth;
          let finalRenderHeight = renderHeight;
          const maxAvailableHeight = pdfHeight - margin - currentY;
          
          if (finalRenderHeight > maxAvailableHeight) {
            const scaleDown = maxAvailableHeight / finalRenderHeight;
            finalRenderHeight = finalRenderHeight * scaleDown;
            finalRenderWidth = finalRenderWidth * scaleDown;
          }
          
          // Center it horizontally if it was scaled down
          const xOffset = margin + (renderWidth - finalRenderWidth) / 2;
          
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', xOffset, currentY, finalRenderWidth, finalRenderHeight, undefined, 'FAST');
          currentY += finalRenderHeight + 15;
          continue;
        }
        
        // Slicing logic for large blocks
        let remainingHeight = renderHeight;
        let imgPosition = currentY;
        let sourceYOffset = 0;

        while (remainingHeight > 0) {
          // If we are out of space on current page, add a new one
          if (imgPosition >= pdfHeight - margin) {
            pdf.addPage();
            paintPage();
            imgPosition = 65;
          }

          const availableHeight = pdfHeight - margin - imgPosition;
          const drawnHeight = Math.min(remainingHeight, availableHeight);
          
          // Map PDF points to canvas pixels
          const canvasY = sourceYOffset * scaleRatio;
          const canvasH = drawnHeight * scaleRatio;
          
          // Get the sliced image data URL
          const sliceImgData = getCanvasSlice(canvas, canvasY, canvasH);
          
          // Add the pre-sliced image to the PDF (always positive Y coordinates!)
          pdf.addImage(sliceImgData, 'PNG', margin, imgPosition, renderWidth, drawnHeight, undefined, 'FAST');

          remainingHeight -= drawnHeight;
          sourceYOffset += drawnHeight;
          imgPosition += drawnHeight;
        }
        
        currentY = imgPosition + 15;
      }
    }

    // 5. Generate PDF blob and manually trigger download for max compatibility
    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // Append to body, click, and cleanup
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Revoke URL after a small delay to ensure download starts
    setTimeout(() => URL.revokeObjectURL(url), 1000);

  } finally {
    // Restore styling
    container.setAttribute('style', originalStyle);
    const extendedContent = document.getElementById('pdf-extended-content');
    if (extendedContent) {
      extendedContent.style.display = 'none';
    }
  }
}
