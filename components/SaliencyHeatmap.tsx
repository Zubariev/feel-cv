import React, { useEffect, useRef } from 'react';
import { VisualHotspot } from '../types';

interface Props {
  hotspots: VisualHotspot[];
  width: number;
  height: number;
}

export const SaliencyHeatmap: React.FC<Props> = ({ hotspots, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0 || height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas dimensions and clear
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    if (!hotspots || hotspots.length === 0) return;

    // 1. Create a density map on an offscreen canvas
    const densityCanvas = document.createElement('canvas');
    densityCanvas.width = width;
    densityCanvas.height = height;
    const densityCtx = densityCanvas.getContext('2d');
    if (!densityCtx) return;

    // Fill with black (0 intensity)
    densityCtx.fillStyle = '#000000';
    densityCtx.fillRect(0, 0, width, height);

    // Draw hotspots
    hotspots.forEach(spot => {
        // Clamp percentages to 0-100 to avoid drawing off-canvas
        const safeX = Math.max(0, Math.min(100, spot.x));
        const safeY = Math.max(0, Math.min(100, spot.y));

        const x = (safeX / 100) * width;
        const y = (safeY / 100) * height;
        
        // Dynamic radius based on viewport
        const radius = Math.max(width, height) * 0.15; 
        
        const gradient = densityCtx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${spot.weight})`); 
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        densityCtx.fillStyle = gradient;
        // 'screen' blending adds up intensities
        densityCtx.globalCompositeOperation = 'screen'; 
        densityCtx.beginPath();
        densityCtx.arc(x, y, radius, 0, 2 * Math.PI);
        densityCtx.fill();
    });

    // 2. Map density to Inferno colormap
    const densityData = densityCtx.getImageData(0, 0, width, height);
    const pixels = densityData.data; // RGBA
    
    const outputData = ctx.createImageData(width, height);
    const outPixels = outputData.data;

    // Inferno Colormap
    const stops = [
        { pos: 0.0, r: 0, g: 0, b: 4 },       // Black
        { pos: 0.2, r: 66, g: 10, b: 104 },   // Purple
        { pos: 0.4, r: 147, g: 38, b: 103 },  // Magenta
        { pos: 0.6, r: 221, g: 81, b: 58 },   // Orange-Red
        { pos: 0.8, r: 252, g: 165, b: 10 },  // Yellow-Orange
        { pos: 1.0, r: 252, g: 255, b: 164 }  // Pale Yellow
    ];

    const getInfernoColor = (t: number) => {
        t = Math.max(0, Math.min(1, t));
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
    };

    for (let i = 0; i < pixels.length; i += 4) {
        // Use Red channel as intensity
        const intensity = pixels[i] / 255; 
        
        // Skip pixels with very low intensity to allow underlying image to show through better
        if (intensity < 0.05) {
             outPixels[i + 3] = 0; // Transparent
             continue;
        }

        const [r, g, b] = getInfernoColor(intensity);
        
        outPixels[i] = r;
        outPixels[i + 1] = g;
        outPixels[i + 2] = b;
        // Map opacity: Low intensity is more transparent, high intensity is more opaque
        outPixels[i + 3] = Math.floor(Math.min(255, intensity * 200 + 50)); 
    }

    ctx.putImageData(outputData, 0, 0);

  }, [hotspots, width, height]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-10"
      style={{ 
        width: '100%', 
        height: '100%',
        opacity: 0.7, 
        mixBlendMode: 'normal' 
      }}
    />
  );
};
