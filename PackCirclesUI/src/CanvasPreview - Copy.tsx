import { useEffect, useRef } from 'react';

// 1. Explicitly match your exact C# class property structure
interface CircleFromCSharp {
  diameter: number;
  isFilled: boolean;
  x: number; // This is now your C# calculated Center X
  y: number; // This is now your C# calculated Center Y
}

interface CanvasPreviewProps {
  title: string;
  width: number;
  height: number;
  circles: CircleFromCSharp[];
}

export default function CanvasPreview({ title, width, height, circles }: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear previous drawing frames
    ctx.clearRect(0, 0, width, height);

    // Draw Sheet background boundary space
    ctx.fillStyle = '#495057';
    ctx.fillRect(0, 0, width, height);

    // Loop through your pre-calculated center arrays
    circles.forEach((circle) => {
      // Extract the radius directly out of your C# Diameter property
      const radius = circle.diameter / 2;

      ctx.beginPath();
      // Uses your new C# center coordinates directly without additional math transformations
      ctx.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
      
      if (circle.isFilled) {
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      } else {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });
  }, [circles, width, height]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{title}</h4>
      <div style={{ background: '#f1f3f5', padding: '10px', borderRadius: '6px', display: 'inline-block' }}>
        <canvas ref={canvasRef} width={width} height={height} style={{ display: 'block', maxWidth: '100%' }} />
      </div>
    </div>
  );
}
