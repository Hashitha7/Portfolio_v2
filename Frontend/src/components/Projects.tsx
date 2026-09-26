import { useEffect, useRef, useState, useCallback } from 'react';
import projectMail from '../assets/project_mail.png';
import projectWayback from '../assets/project_wayback.png';
import projectDomain from '../assets/project_domain.png';
import projectDiluBeats from '../assets/project_dilubeats.png';
import projectCQGroup from '../assets/project_cqgroup.png';
import projectNeuriox from '../assets/project_neuriox.png';
import './Projects.css';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  status: 'Production' | 'Development' | 'Beta';
  link?: string;
}

const projects: Project[] = [
  {
    title: 'Mail Management Service',
    description:
      'Official domain-based mailbox management system with mailbox request handling and role-based access control.',
    image: projectMail,
    tags: ['React', 'Node.js', 'MongoDB', 'RestAPI', '+1'],
    status: 'Production',
  },
  {
    title: 'Wayback Downloading Machine',
    description:
      'A tool to capture expired domains and download stable archived versions from the Wayback Machine.',
    image: projectWayback,
    tags: ['React', 'Node.js', 'RestAPI', 'Web Sockets'],
    status: 'Production',
  },
  {
    title: 'Domain Rank Checker',
    description:
      'A real-time domain rank checker, tracks Google Top 10 search results and analysise with system db to provide insights on domain performance and..',
    image: projectDomain,
    tags: ['React', 'Node.js', 'REST API', 'Web Sockets'],
    status: 'Production',
  },
  {
    title: 'DILU Beats',
    description:
      'Professional portfolio website for Sri Lankan music producer featuring interactive design and seamless user experience.',
    image: projectDiluBeats,
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    status: 'Production',
  },
  {
    title: 'CQ Group Landing Page',
    description:
      'Modern, responsive landing page for UK-based IT solutions company with professional design and animations.',
    image: projectCQGroup,
    tags: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    status: 'Production',
  },
  {
    title: 'Neuriox IT Landing Page',
    description:
      'Elegant landing page for freelancing web development company showcasing services and portfolio.',
    image: projectNeuriox,
    tags: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    status: 'Production',
  },
];

/* ── 3D Tilt Card ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,240,255,0.15) 0%, transparent 60%)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent';
    }
  }, []);

  return (
    <article
      className="projects__card"
      ref={cardRef}
      id={`project-card-${index}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Glow that follows cursor */}
      <div className="projects__card-glow" ref={glowRef}></div>

      {/* HUD corner brackets */}
      <div className="projects__hud-corner projects__hud-corner--tl"></div>
      <div className="projects__hud-corner projects__hud-corner--tr"></div>
      <div className="projects__hud-corner projects__hud-corner--bl"></div>
      <div className="projects__hud-corner projects__hud-corner--br"></div>

      {/* Image */}
      <div className="projects__card-image">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="projects__card-scanlines"></div>
        {/* Status Badge */}
        <span className={`projects__badge projects__badge--${project.status.toLowerCase()}`}>
          <span className="projects__badge-pulse"></span>
          {project.status}
        </span>
        {/* Hover Overlay */}
        <div className="projects__card-overlay">
          <div className="projects__card-holo">
            <span className="projects__card-holo-ring"></span>
            <span className="projects__card-view">View Project →</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="projects__card-content">
        {/* Title with terminal prefix */}
        <div className="projects__card-title-row">
          <span className="projects__card-index">
            [{String(index).padStart(2, '0')}]
          </span>
          <h3 className="projects__card-title">{project.title}</h3>
        </div>
        <p className="projects__card-desc">{project.description}</p>

        {/* Tags */}
        <div className="projects__card-tags">
          {project.tags.map((tag, j) => (
            <span className="projects__tag" key={j}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="projects__card-accent"></div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`projects ${isVisible ? 'projects--visible' : ''}`}
      id="projects"
      ref={sectionRef}
    >
      {/* Background decorative elements */}
      <div className="projects__bg-circuit" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="projects__circuit-svg projects__circuit-svg--1">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(0,240,255,0.06)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,0,255,0.04)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(0,240,255,0.03)" strokeWidth="0.5" />
        </svg>
        <svg viewBox="0 0 200 200" className="projects__circuit-svg projects__circuit-svg--2">
          <rect x="20" y="20" width="160" height="160" rx="8" fill="none" stroke="rgba(255,0,255,0.04)" strokeWidth="0.5" strokeDasharray="8 4" />
          <rect x="50" y="50" width="100" height="100" rx="4" fill="none" stroke="rgba(0,240,255,0.04)" strokeWidth="0.5" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* ── Section Header ── */}
      <div className="projects__header">
        <div className="projects__header-hud">
          <span className="projects__hud-line projects__hud-line--left"></span>
          <div className="projects__header-inner">
            <h2 className="projects__title">PROJECTS.DIR</h2>
            <p className="projects__subtitle">
              <span className="projects__cmd-prefix">&gt; $ </span>
              ls -la ~/projects | grep -i "innovative"
            </p>
          </div>
          <span className="projects__hud-line projects__hud-line--right"></span>
        </div>
        <div className="projects__title-underline"></div>
      </div>

      {/* ── Project Grid ── */}
      <div className="projects__grid">
        {projects.map((project, i) => (
          <ProjectCard project={project} index={i} key={i} />
        ))}
      </div>

      {/* ── See More Button ── */}
      <div className="projects__more">
        <a href="#" className="projects__more-btn" id="see-more-projects">
          <span className="projects__more-btn-bg"></span>
          <span className="projects__more-btn-text">
            SEE MORE PROJECTS <span className="projects__more-arrow">→</span>
          </span>
        </a>
        <div className="projects__more-line"></div>
      </div>
    </section>
  );
}
