import { useEffect, useRef, useState } from 'react';
import './CyberCursor.css';

interface TrailParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface ClickSpark {
  x: number;
  y: number;
  z: number;
  px: number; // previous projected x for laser streak
  py: number; // previous projected y
  vx: number;
  vy: number;
  vz: number;
  life: number;
  color: string;
  size: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
  color: string;
  rotation: number;
  tiltX: number;
}

export default function CyberCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop devices with fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!canvas || !dot || !ring) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

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

    // Mouse coordinates
    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let ringAngle = 0;

    const trailParticles: TrailParticle[] = [];
    const clickSparks: ClickSpark[] = [];
    const clickRipples: ClickRipple[] = [];

    const colors = ['#00f0ff', '#ff00ff', '#ffffff', '#39ff14', '#a855f7'];

    // ── Mouse Move Handler ──
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Detect hover over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = !!target.closest(
          'a, button, input, textarea, select, [role="button"], .project-card, .skills__matrix-card, .about__trait-card, .hero__social, .hero__cta'
        );
        setIsHovered(interactive);
      }

      // Calculate speed
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn 3D trail particles on movement
      if (speed > 1.2 && trailParticles.length < 55) {
        const particleCount = Math.min(Math.floor(speed / 4) + 1, 3);
        for (let i = 0; i < particleCount; i++) {
          const color = Math.random() < 0.65 ? '#00f0ff' : Math.random() < 0.85 ? '#ff00ff' : '#ffffff';
          trailParticles.push({
            x: mouseX + (Math.random() - 0.5) * 6,
            y: mouseY + (Math.random() - 0.5) * 6,
            z: (Math.random() - 0.5) * 60,
            vx: -dx * 0.12 + (Math.random() - 0.5) * 1.4,
            vy: -dy * 0.12 + (Math.random() - 0.5) * 1.4,
            vz: (Math.random() - 0.5) * 2.0,
            life: 1.0,
            maxLife: 1.0,
            size: Math.random() * 2.5 + 1.2,
            color,
          });
        }
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;
    };

    // ── Mouse Down (3D Shockwave & Spark Burst) ──
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      const x = e.clientX;
      const y = e.clientY;

      // 1. Concentric 3D Expanding Shockwaves
      clickRipples.push({
        x,
        y,
        radius: 4,
        maxRadius: 85,
        life: 1.0,
        color: '#00f0ff',
        rotation: Math.random() * Math.PI,
        tiltX: (Math.random() - 0.5) * 0.4,
      });

      clickRipples.push({
        x,
        y,
        radius: 2,
        maxRadius: 110,
        life: 0.9,
        color: '#ff00ff',
        rotation: Math.random() * Math.PI,
        tiltX: (Math.random() - 0.5) * 0.4,
      });

      // 2. 3D Spark Particle Explosion (18 particles with perspective)
      for (let i = 0; i < 18; i++) {
        const theta = (i / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const phi = (Math.random() - 0.5) * Math.PI; // 3D elevation angle
        const speed = Math.random() * 5.5 + 3.5;

        const vx = Math.cos(theta) * Math.cos(phi) * speed;
        const vy = Math.sin(theta) * Math.cos(phi) * speed;
        const vz = Math.sin(phi) * speed * 4;

        clickSparks.push({
          x,
          y,
          z: 0,
          px: x,
          py: y,
          vx,
          vy,
          vz,
          life: 1.0,
          color: colors[i % colors.length],
          size: Math.random() * 2.5 + 1.5,
        });
      }
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // ── Animation Loop ──
    let animId: number;
    const perspective = 450; // 3D perspective focal length

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth Lerp for outer ring
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      // Dynamic rotation based on movement
      const speed = Math.sqrt((mouseX - ringX) ** 2 + (mouseY - ringY) ** 2);
      ringAngle += 0.02 + speed * 0.003;

      // Update DOM cursor elements
      if (dot && ring) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(${ringAngle}rad)`;
      }

      // ── Render 3D Click Shockwaves ──
      for (let i = clickRipples.length - 1; i >= 0; i--) {
        const ripple = clickRipples[i];
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.12;
        ripple.life -= 0.038;

        if (ripple.life <= 0) {
          clickRipples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(ripple.x, ripple.y);
        ctx.scale(1, 1 + ripple.tiltX); // 3D ellipse perspective tilt
        ctx.rotate(ripple.rotation);

        // Expanding outer ring
        ctx.beginPath();
        ctx.arc(0, 0, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color;
        ctx.globalAlpha = ripple.life * 0.85;
        ctx.lineWidth = 1.8 * ripple.life;
        ctx.shadowColor = ripple.color;
        ctx.shadowBlur = 10;
        ctx.stroke();

        // 4 Reticle tick lines on shockwave
        const tickLen = 6;
        for (let a = 0; a < 4; a++) {
          const angle = (a * Math.PI) / 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          ctx.beginPath();
          ctx.moveTo(cos * (ripple.radius - tickLen), sin * (ripple.radius - tickLen));
          ctx.lineTo(cos * (ripple.radius + tickLen), sin * (ripple.radius + tickLen));
          ctx.stroke();
        }

        ctx.restore();
      }

      // ── Render 3D Click Sparks (Laser streaks) ──
      for (let i = clickSparks.length - 1; i >= 0; i--) {
        const spark = clickSparks[i];

        spark.px = spark.x;
        spark.py = spark.y;

        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.z += spark.vz;

        // Friction and gravity
        spark.vx *= 0.91;
        spark.vy *= 0.91;
        spark.vz *= 0.91;
        spark.life -= 0.032;

        if (spark.life <= 0) {
          clickSparks.splice(i, 1);
          continue;
        }

        // 3D perspective projection
        const scale = perspective / (perspective + spark.z);
        const projX = spark.x;
        const projY = spark.y;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(spark.px, spark.py);
        ctx.lineTo(projX, projY);
        ctx.strokeStyle = spark.color;
        ctx.globalAlpha = spark.life * 0.9;
        ctx.lineWidth = spark.size * scale * spark.life;
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Bright spark head dot
        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(0.8, spark.size * scale * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      }

      // ── Render Motion Trail Particles (ehata mehata geniyaddi) ──
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.life -= 0.035;

        if (p.life <= 0) {
          trailParticles.splice(i, 1);
          continue;
        }

        // 3D perspective projection
        const scale = perspective / (perspective + p.z);
        const radius = Math.max(0.5, p.size * scale * p.life);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.65;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* 3D Motion Canvas */}
      <canvas ref={canvasRef} className="cyber-cursor-canvas" aria-hidden="true" />

      {/* Futuristic Reticle Ring */}
      <div
        ref={ringRef}
        className={`cyber-cursor-ring ${isHovered ? 'cyber-cursor-ring--hover' : ''} ${
          isClicked ? 'cyber-cursor-ring--click' : ''
        } ${!isVisible ? 'cyber-cursor--hidden' : ''}`}
        aria-hidden="true"
      >
        <span className="cyber-cursor-bracket cyber-cursor-bracket--tl" />
        <span className="cyber-cursor-bracket cyber-cursor-bracket--tr" />
        <span className="cyber-cursor-bracket cyber-cursor-bracket--bl" />
        <span className="cyber-cursor-bracket cyber-cursor-bracket--br" />
      </div>

      {/* Laser Center Dot */}
      <div
        ref={dotRef}
        className={`cyber-cursor-dot ${isHovered ? 'cyber-cursor-dot--hover' : ''} ${
          isClicked ? 'cyber-cursor-dot--click' : ''
        } ${!isVisible ? 'cyber-cursor--hidden' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
