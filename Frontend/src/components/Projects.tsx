import { useEffect, useRef, useState, useCallback } from 'react';
import projectTenzor from '../assets/projects/Tenzor labs.png';
import projectTestNova from '../assets/projects/AI QA & Test Generation Platform.png';
import projectOracleMedical from '../assets/projects/medical channeling system.png';
import projectGalleryCafe from '../assets/projects/The Gallery Cafe.png';
import projectDogNutrition from '../assets/projects/Dog Nutrition Mobile App.png';
import projectStockMgmt from '../assets/projects/stock management system.png';
import projectSuperMart from '../assets/projects/SuperMart.png';
import projectModernisticLMS from '../assets/projects/modernistic lms.png';
import projectNodeX from '../assets/projects/NodeX.png';
import projectLuckyLux from '../assets/projects/luckylux.png';
import projectLextar from '../assets/projects/Lextar.png';
import projectDonora from '../assets/projects/donora.png';
import projectPhotography from '../assets/projects/photography portfolio.png';
import projectBananaNexus from '../assets/projects/banananexusgame.png';
import './Projects.css';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  status: 'Production' | 'Development' | 'Beta';
  codeLink?: string;
  liveLink?: string;
  hideLive?: boolean;
}

const projects: Project[] = [
  {
    title: 'Tenzor LABS Platform',
    description:
      'Official web platform for Tenzor LABS startup, showcasing technology solutions, AI workflows, software development, and client engineering services.',
    image: projectTenzor,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'UI/UX'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/TENZOR-LABS',
    liveLink: 'https://tenzor-labs.vercel.app',
  },
  {
    title: 'TestNova AI QA Platform',
    description:
      'Next-generation AI-powered quality assurance and test script generator that creates automated test suites and analyzes defects from Jira requirements.',
    image: projectTestNova,
    tags: ['React', 'Node.js', 'AI / LLM', 'Automation', 'TypeScript'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/AI-QA-Test-Generation-Platform',
    hideLive: true,
  },
  {
    title: 'Oracle Medical Channeling System',
    description:
      'Comprehensive healthcare appointment booking and doctor channeling management platform with real-time patient analytics and scheduling.',
    image: projectOracleMedical,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/Medical-Channeling-System',
    hideLive: true,
  },
  {
    title: 'The Gallery Cafe Management',
    description:
      'Full-scale restaurant management & POS solution with live table reservation, kitchen order routing, real-time revenue analytics, and staff tracking.',
    image: projectGalleryCafe,
    tags: ['React', 'TypeScript', 'Node.js', 'POS System', 'MongoDB'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/Restaurant',
    hideLive: true,
  },
  {
    title: 'Dog Nutrition Mobile App',
    description:
      'Modern, health-focused pet nutrition and meal planning mobile app with breed-specific diet guides, caloric tracking, and veterinarian reminders.',
    image: projectDogNutrition,
    tags: ['React Native', 'Figma', 'UI/UX', 'Mobile App', 'TypeScript'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/Dog-Nurition-App',
    hideLive: true,
  },
  {
    title: 'Stock Management System',
    description:
      'Enterprise inventory control and POS billing system featuring real-time stock monitoring, procurement order workflows, and role-based access.',
    image: projectStockMgmt,
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'Analytics'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/Stock-Management-System',
    hideLive: true,
  },
  {
    title: 'SuperMart POS & Inventory',
    description:
      'High-speed Point-of-Sale software for retail supermarkets featuring transaction logging, barcode scanning support, and sales performance charts.',
    image: projectSuperMart,
    tags: ['React', 'Node.js', 'REST API', 'POS', 'Tailwind CSS'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/pos-system-fullstack-angular',
    hideLive: true,
  },
  {
    title: 'Modernistic LMS & AI Analyst',
    description:
      'Intelligent Learning Management System equipped with an AI Answer Analyst to automatically evaluate student responses and generate learning insights.',
    image: projectModernisticLMS,
    tags: ['React', 'Python', 'AI / ML', 'EdTech', 'Node.js'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/Final-project-LMS-SCU-',
    liveLink: 'https://final-project-lms-scu.vercel.app',
  },
  {
    title: 'NodeX Blockchain Explorer',
    description:
      'Real-time P2P cryptocurrency network explorer displaying connected nodes, mempool transaction status, and cryptographic block verification.',
    image: projectNodeX,
    tags: ['React', 'TypeScript', 'WebSockets', 'Crypto / P2P', 'Node.js'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/go-multinode-blockchain',
  },
  {
    title: 'LuckyLux Web3 Platform',
    description:
      'Next-generation Web3 gaming and casino landing platform featuring interactive 3D assets, tokenomics integration, and decentralized design.',
    image: projectLuckyLux,
    tags: ['React', 'Vite', 'Web3', 'Tailwind CSS', 'Figma'],
    status: 'Production',
    liveLink: 'https://luckylux-t00191.onrender.com/',
  },
  {
    title: 'Lextar Tokenomics Platform',
    description:
      'Vibrant decentralized finance web platform featuring character brand identity, DEX tools integration, roadmap tracking, and token utility.',
    image: projectLextar,
    tags: ['React', 'Tailwind CSS', 'Web3', 'JavaScript', 'DEX'],
    status: 'Production',
    liveLink: 'https://t00192-lextar.onrender.com/',
  },
  {
    title: 'Donora Digital Platform',
    description:
      'Dynamic anime-themed creative web application featuring custom branding, responsive navigation, service offerings, and community engagement.',
    image: projectDonora,
    tags: ['React', 'Vite', 'CSS3', 'Responsive Design', 'JavaScript'],
    status: 'Production',
    liveLink: 'https://donora-t00206.onrender.com/',
  },
  {
    title: 'Tharusha Dilshan Photography',
    description:
      'Minimalist, high-end photography showcase and client booking platform designed for creative visual artists with gallery showcases.',
    image: projectPhotography,
    tags: ['React', 'Tailwind CSS', 'UI/UX', 'Photography', 'TypeScript'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/Photography_Site',
    liveLink: 'https://tharushadilshan.vercel.app',
  },
  {
    title: 'Banana Nexus Interactive Game',
    description:
      'Lush, illustrated jungle adventure interactive web gaming experience featuring custom character art, authentication, and responsive controls.',
    image: projectBananaNexus,
    tags: ['HTML5 Canvas', 'React', 'JavaScript', 'Game Dev', 'CSS3'],
    status: 'Production',
    codeLink: 'https://github.com/Hashitha7/banana-nexus-game',
    hideLive: true,
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
      style={{ animationDelay: `${index * 0.08}s` }}
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
        {/* Action Buttons Overlay (Code & Live) */}
        <div className="projects__card-overlay">
          <div className="projects__card-actions">
            <a
              href={project.codeLink || '#'}
              target={project.codeLink && project.codeLink !== '#' ? '_blank' : undefined}
              rel={project.codeLink && project.codeLink !== '#' ? 'noopener noreferrer' : undefined}
              className="projects__btn-action projects__btn-action--code"
              onClick={(e) => {
                e.stopPropagation();
                if (!project.codeLink || project.codeLink === '#') {
                  e.preventDefault();
                }
              }}
              aria-label={`View code for ${project.title}`}
            >
              <svg
                className="projects__btn-action-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>Code</span>
            </a>

            {!project.hideLive && (
              <a
                href={project.liveLink || '#'}
                target={project.liveLink && project.liveLink !== '#' ? '_blank' : undefined}
                rel={project.liveLink && project.liveLink !== '#' ? 'noopener noreferrer' : undefined}
                className="projects__btn-action projects__btn-action--live"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!project.liveLink || project.liveLink === '#') {
                    e.preventDefault();
                  }
                }}
                aria-label={`View live demo for ${project.title}`}
              >
                <svg
                  className="projects__btn-action-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span>Live</span>
              </a>
            )}
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
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 6);

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
        {visibleProjects.map((project, i) => (
          <ProjectCard project={project} index={i} key={i} />
        ))}
      </div>

      {/* ── See More / Show Less Toggle Button ── */}
      <div className="projects__more">
        <button
          type="button"
          className="projects__more-btn"
          id="see-more-projects"
          onClick={() => setShowAll(!showAll)}
        >
          <span className="projects__more-btn-bg"></span>
          <span className="projects__more-btn-text">
            {showAll ? 'SHOW LESS PROJECTS' : `SEE MORE PROJECTS (${projects.length - 6} MORE)`}
            <span className="projects__more-arrow">{showAll ? ' ↑' : ' →'}</span>
          </span>
        </button>
        <div className="projects__more-line"></div>
      </div>
    </section>
  );
}
