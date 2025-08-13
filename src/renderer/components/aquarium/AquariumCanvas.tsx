import { useRef, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import type { AquariumState } from '@shared/types';
import { drawAquarium } from './drawing';
import { updateFishPositions } from './physics';

interface AquariumCanvasProps {
  state: AquariumState;
}

export function AquariumCanvas({ state }: AquariumCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const animate = useCallback(
    (currentTime: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Calculate delta time
      const deltaTime = lastTimeRef.current ? (currentTime - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = currentTime;

      // Update fish positions
      const updatedState = updateFishPositions(state, deltaTime, canvas.width, canvas.height);

      // Clear and redraw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawAquarium(ctx, updatedState, canvas.width, canvas.height);

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [state]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle canvas resize
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight - 40; // Account for title
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return (
    <Box className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg"
        style={{
          background: 'linear-gradient(to bottom, #87CEEB 0%, #4682B4 100%)',
          cursor: 'pointer'
        }}
      />
    </Box>
  );
}
