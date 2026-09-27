import { useState, useEffect, useRef } from 'react';
import portraitLeft from '../assets/I-2.png';
import portraitRight from '../assets/I-1.png';
import './Hero.css';

const roles = ['UI/UX Creator', 'Full Stack Developer', 'Software Engineer', 'Creative Designer'];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [particlePositions] = useState(() =>
    Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 3,
    }))
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typing effect
  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(role.slice(0, displayText.length + 1));
          if (displayText.length === role.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(role.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  // Scanline canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let y = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.fillRect(0, y, canvas.width, 2);
      y = (y + 1) % canvas.height;
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <section className="hero-section" id="home">
      {/* Background canvas scanline */}
      <canvas ref={canvasRef} className="hero__scanline-canvas" />

      {/* Floating particles */}
      <div className="hero__particles">
        {particlePositions.map((p, i) => (
          <span
            key={i}
            className="hero__particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating code snippets */}
      <div className="hero__code-snippets">
        <span className="hero__code hero__code--left-1">
          <span className="code-keyword">const</span> developer = <span className="code-string">"Hashitha Danidu"</span>;
        </span>
        <span className="hero__code hero__code--right-1">
          <span className="code-keyword">return</span> innovation;
        </span>
        <span className="hero__code hero__code--left-2">
          <span className="code-func">function</span> <span className="code-name">createAwesome</span>() {'{'}
        </span>
        <span className="hero__code hero__code--right-2">
          <span className="code-keyword">new</span> Product = <span className="code-name">createAwesome</span>();
        </span>
      </div>

      {/* Welcome comment */}
      <p className="hero__comment">// Welcome to my portfolio!</p>

      {/* Main Name */}
      <h1 className="hero__name">
        <span className="hero__name-dot">.</span>
        <span className="hero__name-first">H</span>
        <span className="hero__name-dot">.</span>
        <span className="hero__name-main">HASHITHA DANIDU</span>
      </h1>

      {/* Typing Role */}
      <div className="hero__role">
        <span className="hero__role-prefix">&gt; </span>
        <span className="hero__role-text">{displayText}</span>
        <span className="hero__role-cursor">|</span>
      </div>

      {/* Tagline */}
      <p className="hero__tagline">
        <span className="hero__tagline-highlight">Engineer</span> by Skill.{' '}
        <span className="hero__tagline-accent">Artist</span> by Vision.
      </p>

      {/* Status Badge */}
      <div className="hero__badge">
        <span className="hero__badge-dot"></span>
        <span>Fresh Graduate @ SLIIT</span>
      </div>

      {/* CTA Buttons */}
      <div className="hero__ctas">
        <a href="#projects" className="hero__cta hero__cta--primary" id="cta-projects">
          VIEW PROJECTS
        </a>
        <a href="#" className="hero__cta hero__cta--secondary" id="cta-cv">
          <span className="hero__cta-icon">↓</span> DOWNLOAD CV
        </a>
        <a href="#contact" className="hero__cta hero__cta--tertiary" id="cta-contact">
          INITIALIZE CONTACT
        </a>
      </div>

      {/* Social Links */}
      <div className="hero__socials">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hero__social" id="social-github" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hero__social" id="social-linkedin" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hero__social" id="social-instagram" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hero__social" id="social-facebook" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
      </div>

      {/* Portrait Images - Left & Right */}
      <div className="hero__portrait hero__portrait--left">
        <img src={portraitLeft} alt="H.Hashitha Danidu" />
        <div className="hero__portrait-overlay hero__portrait-overlay--left"></div>
      </div>
      <div className="hero__portrait hero__portrait--right">
        <img src={portraitRight} alt="H.Hashitha Danidu" />
        <div className="hero__portrait-overlay hero__portrait-overlay--right"></div>
      </div>

      {/* Bottom gradient line */}
      <div className="hero__bottom-line"></div>
    </section>
  );
}
