/**
 * Layer Capture Service
 * Captures and composites visual layers from resume analysis
 */

import { VisualHotspot, SkillHighlight } from '../types';

/**
 * Generates the Inferno colormap color for a given intensity
 */
function getInfernoColor(t: number): [number, number, number] {
  t = Math.max(0, Math.min(1, t));

  const stops = [
    { pos: 0.0, r: 0, g: 0, b: 4 },
    { pos: 0.2, r: 66, g: 10, b: 104 },
    { pos: 0.4, r: 147, g: 38, b: 103 },
    { pos: 0.6, r: 221, g: 81, b: 58 },
    { pos: 0.8, r: 252, g: 165, b: 10 },
    { pos: 1.0, r: 252, g: 255, b: 164 }
  ];

  let lower = stops[0];
  let upper = stops[stops.length - 1];

  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i].pos && t <= stops[i + 1].pos) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }

  const range = upper.pos - lower.pos;
  const rangeT = (t - lower.pos) / range;

  return [
    Math.floor(lower.r + (upper.r - lower.r) * rangeT),
    Math.floor(lower.g + (upper.g - lower.g) * rangeT),
    Math.floor(lower.b + (upper.b - lower.b) * rangeT)
  ];
}

/**
 * Get color for skill type
 */
function getSkillColor(type: string): string {
  switch (type) {
    case 'hard':
      return 'rgba(99, 102, 241, 0.4)'; // indigo-500
    case 'soft':
      return 'rgba(45, 212, 191, 0.4)'; // teal-400
    case 'impact':
      return 'rgba(244, 63, 94, 0.4)'; // rose-500
    case 'education':
      return 'rgba(251, 191, 36, 0.4)'; // amber-400
    default:
      return 'rgba(156, 163, 175, 0.4)'; // gray-400
  }
}

export const layerCaptureService = {
  /**
   * Render heatmap layer to canvas and return as data URL
   */
  renderHeatmapLayer(
    hotspots: VisualHotspot[],
    width: number,
    height: number
  ): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Create density map
    const densityCanvas = document.createElement('canvas');
    densityCanvas.width = width;
    densityCanvas.height = height;
    const densityCtx = densityCanvas.getContext('2d');
    if (!densityCtx) return '';

    densityCtx.fillStyle = '#000000';
    densityCtx.fillRect(0, 0, width, height);

    // Draw hotspots
    hotspots.forEach(spot => {
      const safeX = Math.max(0, Math.min(100, spot.x));
      const safeY = Math.max(0, Math.min(100, spot.y));
      const x = (safeX / 100) * width;
      const y = (safeY / 100) * height;
      const radius = Math.max(width, height) * 0.15;

      const gradient = densityCtx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${spot.weight})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      densityCtx.fillStyle = gradient;
      densityCtx.globalCompositeOperation = 'screen';
      densityCtx.beginPath();
      densityCtx.arc(x, y, radius, 0, 2 * Math.PI);
      densityCtx.fill();
    });

    // Map to Inferno colormap
    const densityData = densityCtx.getImageData(0, 0, width, height);
    const pixels = densityData.data;
    const outputData = ctx.createImageData(width, height);
    const outPixels = outputData.data;

    for (let i = 0; i < pixels.length; i += 4) {
      const intensity = pixels[i] / 255;

      if (intensity < 0.05) {
        outPixels[i + 3] = 0;
        continue;
      }

      const [r, g, b] = getInfernoColor(intensity);
      outPixels[i] = r;
      outPixels[i + 1] = g;
      outPixels[i + 2] = b;
      outPixels[i + 3] = Math.floor(Math.min(255, intensity * 200 + 50));
    }

    ctx.putImageData(outputData, 0, 0);
    return canvas.toDataURL('image/png');
  },

  /**
   * Render skills overlay layer to canvas and return as data URL
   */
  renderSkillsLayer(
    highlights: SkillHighlight[],
    width: number,
    height: number
  ): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Clear canvas (transparent background)
    ctx.clearRect(0, 0, width, height);

    highlights.forEach(item => {
      const top = Math.max(0, item.ymin - 0.2);
      const left = Math.max(0, item.xmin - 0.2);
      const boxWidth = (item.xmax - item.xmin) + 0.4;
      const boxHeight = (item.ymax - item.ymin) + 0.4;

      const x = (left / 100) * width;
      const y = (top / 100) * height;
      const w = (boxWidth / 100) * width;
      const h = (boxHeight / 100) * height;

      ctx.fillStyle = getSkillColor(item.type);
      ctx.fillRect(x, y, w, h);
    });

    return canvas.toDataURL('image/png');
  },

  /**
   * Composite base image with heatmap overlay
   */
  async compositeWithHeatmap(
    baseImageUrl: string,
    hotspots: VisualHotspot[]
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Draw base image
        ctx.drawImage(img, 0, 0);

        // Create and draw heatmap overlay
        const heatmapDataUrl = this.renderHeatmapLayer(hotspots, img.width, img.height);
        const heatmapImg = new Image();

        heatmapImg.onload = () => {
          ctx.globalAlpha = 0.7;
          ctx.drawImage(heatmapImg, 0, 0);
          ctx.globalAlpha = 1.0;
          resolve(canvas.toDataURL('image/png'));
        };

        heatmapImg.onerror = () => reject(new Error('Failed to load heatmap overlay'));
        heatmapImg.src = heatmapDataUrl;
      };

      img.onerror = () => reject(new Error('Failed to load base image'));
      img.src = baseImageUrl;
    });
  },

  /**
   * Composite base image with skills overlay
   */
  async compositeWithSkills(
    baseImageUrl: string,
    highlights: SkillHighlight[]
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Draw base image
        ctx.drawImage(img, 0, 0);

        // Draw skills overlay
        const skillsDataUrl = this.renderSkillsLayer(highlights, img.width, img.height);
        const skillsImg = new Image();

        skillsImg.onload = () => {
          ctx.globalCompositeOperation = 'multiply';
          ctx.drawImage(skillsImg, 0, 0);
          ctx.globalCompositeOperation = 'source-over';
          resolve(canvas.toDataURL('image/png'));
        };

        skillsImg.onerror = () => reject(new Error('Failed to load skills overlay'));
        skillsImg.src = skillsDataUrl;
      };

      img.onerror = () => reject(new Error('Failed to load base image'));
      img.src = baseImageUrl;
    });
  },

  /**
   * Composite base image with both heatmap and skills overlays
   */
  async compositeWithBoth(
    baseImageUrl: string,
    hotspots: VisualHotspot[],
    highlights: SkillHighlight[]
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Draw base image
        ctx.drawImage(img, 0, 0);

        // Create heatmap overlay
        const heatmapDataUrl = this.renderHeatmapLayer(hotspots, img.width, img.height);
        const heatmapImg = new Image();

        heatmapImg.onload = () => {
          // Draw heatmap
          ctx.globalAlpha = 0.7;
          ctx.drawImage(heatmapImg, 0, 0);
          ctx.globalAlpha = 1.0;

          // Create and draw skills overlay
          const skillsDataUrl = this.renderSkillsLayer(highlights, img.width, img.height);
          const skillsImg = new Image();

          skillsImg.onload = () => {
            ctx.globalCompositeOperation = 'multiply';
            ctx.drawImage(skillsImg, 0, 0);
            ctx.globalCompositeOperation = 'source-over';
            resolve(canvas.toDataURL('image/png'));
          };

          skillsImg.onerror = () => reject(new Error('Failed to load skills overlay'));
          skillsImg.src = skillsDataUrl;
        };

        heatmapImg.onerror = () => reject(new Error('Failed to load heatmap overlay'));
        heatmapImg.src = heatmapDataUrl;
      };

      img.onerror = () => reject(new Error('Failed to load base image'));
      img.src = baseImageUrl;
    });
  },

  /**
   * Generate all layer variations and return as data URLs
   */
  async generateAllLayers(
    baseImageUrl: string,
    hotspots: VisualHotspot[],
    highlights: SkillHighlight[]
  ): Promise<{
    raw: string;
    heatmap: string;
    skills: string;
    heatmap_skills: string;
  }> {
    const [heatmap, skills, heatmap_skills] = await Promise.all([
      this.compositeWithHeatmap(baseImageUrl, hotspots),
      this.compositeWithSkills(baseImageUrl, highlights),
      this.compositeWithBoth(baseImageUrl, hotspots, highlights)
    ]);

    return {
      raw: baseImageUrl,
      heatmap,
      skills,
      heatmap_skills
    };
  }
};
