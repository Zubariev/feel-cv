declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export const convertPdfToImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!window.pdfjsLib) {
      reject(new Error("PDF.js library not loaded"));
      return;
    }

    // Set worker source
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const reader = new FileReader();
    reader.onload = async function () {
      try {
        const typedarray = new Uint8Array(this.result as ArrayBuffer);
        
        // Load the PDF document
        const pdf = await window.pdfjsLib.getDocument(typedarray).promise;
        
        // Get the first page
        const page = await pdf.getPage(1);
        
        // Render with high scale for quality
        const viewport = page.getViewport({ scale: 2.0 });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (!context) {
          reject(new Error("Could not create canvas context"));
          return;
        }

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        
        // Convert to image
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};
