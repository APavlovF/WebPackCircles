import { useEffect, useRef } from 'react';

interface CircleFromCSharp {
  diameter: number;
  isFilled: boolean;
  x: number; // Center X
  y: number; // Center Y
}

interface CanvasPreviewProps {
  title: string;
  width: number;  // Sheet width from C# (in mm)
  height: number; // Sheet height from C# (in mm)
  circles: CircleFromCSharp[];
}

export default function CanvasPreview({ title, width, height, circles }: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Set a consistent rendering container width (e.g., 500 pixels wide on the monitor)
  const displayWidth = 380;
  // Dynamically compute the aspect ratio height so the layout box doesn't distort
  const displayHeight = height > 0 && width > 0 ? (height / width) * displayWidth : displayWidth;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Clear previous drawing frame
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // 2. Save the base state before applying scale transformations
    ctx.save();

    // 3. Compute the scaling multipliers (Monitor Pixels / Real Sheet Millimeters)
    const scaleX = displayWidth / width;
    const scaleY = displayHeight / height;
    
    // Distribute uniform scaling to prevent oval circles if aspect changes
    const scale = Math.min(scaleX, scaleY);
    ctx.scale(scale, scale);

    // --- EVERYTHING DRAWN BEYOND THIS POINT USES YOUR C# MILLIMETER UNITS ---

    // Draw Sheet background boundary space using real mm sizing
    ctx.fillStyle = '#495057';
    ctx.fillRect(0, 0, width, height);

    // Loop through your pre-calculated center arrays
    circles.forEach((circle) => {
      const radius = circle.diameter / 2;

      ctx.beginPath();
      // Browser automatically multiplies circle.x, circle.y, and radius by our scaling factor!
      ctx.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
      
      if (circle.isFilled) {
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      } else {
        ctx.strokeStyle = '#ffffff';
        // Adjust outline thickness slightly so it scales down proportionally
        ctx.lineWidth = 1.5 / scale; 
        ctx.stroke();
      }
    });

    // 4. Restore the coordinate canvas stack context
    ctx.restore();
  }, [circles, width, height, displayWidth, displayHeight]);

  return (
    <div style={{ textAlign: 'center', width: '100%', maxWidth: `${displayWidth}px` }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{title}</h4>
      <div style={{ background: '#f1f3f5', padding: '10px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <canvas 
          ref={canvasRef} 
          width={displayWidth} 
          height={displayHeight} 
          style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '4px' }} 
        />
      </div>
    </div>
  );
}
