import { useEffect, useRef } from 'react';
import './Snowfall.css';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  swing: number;
  swingSpeed: number;
  swingAmp: number;
  opacity: number;
  colorType: 'white' | 'cyan' | 'soft';
}

export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle density calculation: responsive based on viewport width
    const getParticleCount = (w: number) => {
      if (w < 640) return 40;
      if (w < 1024) return 65;
      if (w < 1600) return 95;
      return 130;
    };

    const count = getParticleCount(width);
    const snowflakes: Snowflake[] = [];

    // Helper to spawn/reset a flake
    const createFlake = (initialY?: number): Snowflake => {
      const radius = Math.random() * 2.4 + 0.8; // 0.8px to 3.2px
      // Depth-based speed: smaller flakes fall slower, larger fall slightly faster
      const speedY = (radius / 3.2) * 1.1 + 0.45; // 0.6 to 1.55 px/frame
      const colorRoll = Math.random();
      const colorType: Snowflake['colorType'] =
        colorRoll < 0.65 ? 'white' : colorRoll < 0.88 ? 'cyan' : 'soft';

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        radius,
        speedY,
        speedX: (Math.random() - 0.5) * 0.4,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.008,
        swingAmp: Math.random() * 0.7 + 0.3,
        opacity: Math.random() * 0.55 + 0.35, // 0.35 to 0.90
        colorType,
      };
    };

    // Initialize all flakes distributed evenly vertically
    for (let i = 0; i < count; i++) {
      snowflakes.push(createFlake(Math.random() * height));
    }

    // High DPI Support
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Track mouse for subtle wind interaction
    let mouseWind = 0;
    let targetWind = 0;
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle horizontal wind based on cursor position relative to center (-0.35 to +0.35)
      targetWind = ((e.clientX / width) - 0.5) * 0.7;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 16.67, 2.5); // normalized to 60fps
      lastTime = currentTime;

      // Smoothly interpolate wind
      mouseWind += (targetWind - mouseWind) * 0.03;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];

        // Horizontal sinusoidal sway + wind
        flake.swing += flake.swingSpeed * delta;
        flake.x += (Math.sin(flake.swing) * flake.swingAmp + flake.speedX + mouseWind) * delta;
        flake.y += flake.speedY * delta;

        // Wrap horizontal edges
        if (flake.x < -10) flake.x = width + 10;
        else if (flake.x > width + 10) flake.x = -10;

        // Reset if snowflake reaches bottom
        if (flake.y > height + 10) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }

        // Draw snowflake
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);

        // Futuristic cyberpunk color styling
        if (flake.colorType === 'cyan') {
          ctx.fillStyle = `rgba(0, 240, 255, ${flake.opacity * 0.85})`;
          ctx.shadowColor = 'rgba(0, 240, 255, 0.7)';
          ctx.shadowBlur = flake.radius > 2.0 ? 6 : 3;
        } else if (flake.colorType === 'soft') {
          ctx.fillStyle = `rgba(180, 225, 255, ${flake.opacity * 0.75})`;
          ctx.shadowColor = 'rgba(180, 225, 255, 0.5)';
          ctx.shadowBlur = flake.radius > 2.0 ? 4 : 2;
        } else {
          // Pure crisp white
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
          ctx.shadowBlur = flake.radius > 2.2 ? 5 : 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow for performance
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="snowfall-canvas" aria-hidden="true" />;
}
