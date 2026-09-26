import { useState, useEffect, useRef } from 'react';
import portrait from '../assets/portrait.png';
import './About.css';

interface Trait {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
}

interface TimelineItem {
  period: string;
  title: string;
  org: string;
  badge?: string;
  description: string;
  bullets?: string[];
  dotColor: string;
}

interface EducationItem {
  period: string;
  title: string;
  org: string;
  detail: string;
  dotColor: string;
}

const traits: Trait[] = [
  { icon: '💻', title: 'Software Engineering', subtitle: 'Student', color: 'var(--cyan)' },
  { icon: '🎨', title: 'Creative', subtitle: 'Designer', color: 'var(--magenta)' },
  { icon: '💡', title: 'Solution', subtitle: 'Thinker', color: 'var(--gold)' },
  { icon: '🤝', title: 'Team', subtitle: 'Planner', color: 'var(--neon-green)' },
];

const timeline: TimelineItem[] = [
  {
    period: '2024 - Present',
    title: 'Founder & Owner',
    org: 'Tenzor LABS — Technology & Digital Solutions',
    badge: 'STARTUP FOUNDER',
    description:
      'Founder and Owner of Tenzor LABS, a modern technology and software startup dedicated to turning ideas into reliable, scalable working solutions. Specializing in high-performance web & mobile applications, AI automation, and custom digital enterprise solutions.',
    bullets: [
      'Leading end-to-end design & development of robust software, web, and mobile systems for businesses and startups.',
      'Architecting AI, Machine Learning, and intelligent automation pipelines to streamline complex operational workflows.',
      'Delivering custom digital products, data analytics, and cloud architectures built for scalability and performance.',
      'Guiding project vision and execution: Innovate • Develop • Deliver — turning visionary concepts into production-ready platforms.',
    ],
    dotColor: 'var(--cyan)',
  },
  {
    period: 'Sep 2025 - Aug 2026',
    title: 'Intern AI Solutions Architect',
    org: '',
    description:
      'Designed and developed scalable websites and a web-based application with a strong focus on functionality, performance, and user experience.',
    bullets: [
      'Built and maintained both front-end and back-end components using React.js, Next.js, Node.js, JavaScript, TypeScript, and MongoDB.',
      'Collaborated with cross-functional development teams to implement new features and ensure successful project delivery.',
      'Performed code reviews, testing, and debugging to improve application stability, reliability, and overall code quality.',
      'Integrated n8n workflow automation into web applications and utilized Docker for containerization and deployment support.',
    ],
    dotColor: 'var(--magenta)',
  },
];

const education: EducationItem[] = [
  {
    period: 'Jan 2025 - July 2026',
    title: 'BSc (Hons) in Information Technology',
    org: 'Sri Lanka Institute of Information Technology (SLIIT CITY UNI)',
    detail: 'Specializing in Software Engineering',
    dotColor: 'var(--cyan)',
  },
  {
    period: '2023 - 2024',
    title: 'Cardiff Metropolitan University / ICBT',
    org: 'Higher National Diploma in Information Technology',
    detail: 'Successfully completed HND in IT with distinction',
    dotColor: 'var(--neon-green)',
  },
  {
    period: '2006 - 2021',
    title: "S. Thomas' College, Matara",
    org: 'Secondary Education',
    detail: 'G.C.E. Ordinary Level (2018) • G.C.E. Advanced Level — Maths Stream (2021)',
    dotColor: 'var(--magenta)',
  },
];

const stats = [
  { value: 11, suffix: '+', label: 'Months Experience' },
  { value: 10, suffix: '+', label: 'Projects Built' },
  { value: 6, suffix: '+', label: 'Tech Stacks' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="about__stat-value">
      {count}{suffix}
    </span>
  );
}

export default function About() {
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
    <section className={`about ${isVisible ? 'about--visible' : ''}`} id="about" ref={sectionRef}>

      {/* Background particles */}
      <div className="about__bg-particles" aria-hidden="true">
        {Array.from({ length: 35 }).map((_, i) => (
          <span key={i} className="about__bg-particle" style={{
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            width: `${(i % 3) + 1}px`,
            height: `${(i % 3) + 1}px`,
            animationDuration: `${(i % 5) + 4}s`,
            animationDelay: `${(i % 4)}s`,
          }} />
        ))}
      </div>

      {/* ── SECTION TITLE ── */}
      <div className="about__section-title">
        <span className="about__title-tag">&gt; </span>
        <h2 className="about__title-text">
          <span className="about__title-accent">ABOUT</span>
          <span className="about__title-exe">.EXE</span>
        </h2>
        <span className="about__title-dot"></span>
        <div className="about__title-underline"></div>
      </div>

      {/* ── MAIN CONTENT: Left avatar + Right content ── */}
      <div className="about__body">

        {/* ── LEFT: Orbital photo + traits ── */}
        <div className="about__left">

          {/* Orbital Avatar */}
          <div className="about__avatar-wrapper">
            {/* Outer orbit */}
            <div className="about__orbit about__orbit--outer">
              <span className="about__orbit-dot about__orbit-dot--1"></span>
              <span className="about__orbit-dot about__orbit-dot--2"></span>
              <span className="about__orbit-dot about__orbit-dot--3"></span>
            </div>
            {/* Inner orbit */}
            <div className="about__orbit about__orbit--inner">
              <span className="about__orbit-dot about__orbit-dot--4"></span>
              <span className="about__orbit-dot about__orbit-dot--5"></span>
            </div>
            {/* Photo circle */}
            <div className="about__avatar-circle">
              <img src={portrait} alt="Hashitha Danidu" className="about__avatar-img" />
              <div className="about__avatar-overlay"></div>
            </div>
          </div>

          {/* Name + title under photo */}
          <div className="about__avatar-info">
            <h3 className="about__avatar-name">Hashitha Danidu</h3>
            <span className="about__avatar-role">Founder @ Tenzor LABS • Full Stack &amp; AI Engineer</span>
            <div className="about__avatar-status">
              <span className="about__status-dot"></span>
              <span>Founder &amp; Owner @ Tenzor LABS | Undergraduate @ SLIIT</span>
            </div>
          </div>

          {/* Stats */}
          <div className="about__stats">
            {stats.map((s, i) => (
              <div className="about__stat" key={i}>
                <AnimatedCounter target={s.value} suffix={s.suffix} />
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Trait cards */}
          <div className="about__traits">
            {traits.map((t, i) => (
              <div
                className="about__trait-card"
                key={i}
                style={{ '--trait-color': t.color } as React.CSSProperties}
              >
                <span className="about__trait-icon">{t.icon}</span>
                <span className="about__trait-title">{t.title}</span>
                <span className="about__trait-subtitle">{t.subtitle}</span>
                <div className="about__trait-glow"></div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Bio + Tabs + Timeline ── */}
        <div className="about__right">

          {/* Bio paragraph */}
          <div className="about__bio">
            <p className="about__bio-text">
              <span className="about__bio-highlight about__bio-highlight--cyan">Founder &amp; Owner of Tenzor LABS</span> and{' '}
              <span className="about__bio-highlight about__bio-highlight--magenta">Passionate Full Stack Developer</span> with a keen eye for{' '}
              <span className="about__bio-highlight about__bio-highlight--cyan">innovative solutions</span>. Leading Tenzor LABS to build scalable,
              AI-driven digital products and robust software solutions while pursuing my Software Engineering degree at SLIIT. I specialize in turning complex ideas into{' '}
              <span className="about__bio-highlight about__bio-highlight--green">reliable, high-impact working solutions</span> that bridge the gap between
              functionality, scalability, and modern aesthetics. Strong problem-solving skills, excellent communication in Sinhala &amp; English, and a passion for
              learning emerging technologies.
            </p>
          </div>

          {/* ── EXPERIENCE TIMELINE ── */}
          <div className="about__section-heading">
            <span className="about__section-heading-icon">⚙️</span>
            <span className="about__section-heading-text">&gt; Journey_Timeline</span>
            <span className="about__section-heading-dot"></span>
          </div>
          <div className="about__timeline">
            <div className="about__timeline-line"></div>
            {timeline.map((item, i) => (
              <div className="about__timeline-item" key={i}>
                <div className="about__timeline-dot-wrapper">
                  <span className="about__timeline-dot" style={{ background: item.dotColor, boxShadow: `0 0 12px ${item.dotColor}, 0 0 28px ${item.dotColor}` }}></span>
                  <span className="about__timeline-dot-ring" style={{ borderColor: item.dotColor }}></span>
                  <span className="about__timeline-dot-pulse" style={{ borderColor: item.dotColor }}></span>
                </div>
                <div className="about__timeline-card">
                  <div className="about__timeline-card-header">
                    <span className="about__timeline-period">{item.period}</span>
                    {item.badge && (
                      <span className="about__timeline-badge">
                        <span className="about__timeline-badge-dot"></span>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="about__timeline-title">{item.title}</h3>
                  {item.org && <span className="about__timeline-org">{item.org}</span>}
                  <p className="about__timeline-desc">{item.description}</p>
                  {item.bullets && (
                    <ul className="about__timeline-bullets">
                      {item.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  )}
                  <div className="about__timeline-card-bar" style={{ background: item.dotColor }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* ── EDUCATION TIMELINE ── */}
          <div className="about__section-heading">
            <span className="about__section-heading-icon">🎓</span>
            <span className="about__section-heading-text">&gt; Academic_Log</span>
            <span className="about__section-heading-dot" style={{ background: 'var(--magenta)', boxShadow: '0 0 8px var(--magenta)' }}></span>
          </div>
          <div className="about__timeline">
            <div className="about__timeline-line"></div>
            {education.map((item, i) => (
              <div className="about__timeline-item" key={i}>
                <div className="about__timeline-dot-wrapper">
                  <span className="about__timeline-dot" style={{ background: item.dotColor, boxShadow: `0 0 12px ${item.dotColor}, 0 0 28px ${item.dotColor}` }}></span>
                  <span className="about__timeline-dot-ring" style={{ borderColor: item.dotColor }}></span>
                  <span className="about__timeline-dot-pulse" style={{ borderColor: item.dotColor }}></span>
                </div>
                <div className="about__timeline-card">
                  <span className="about__timeline-period">{item.period}</span>
                  <h3 className="about__timeline-title">{item.title}</h3>
                  <span className="about__timeline-org">{item.org}</span>
                  <p className="about__timeline-desc">{item.detail}</p>
                  <div className="about__timeline-card-bar" style={{ background: item.dotColor }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about__footer">
        <span className="about__footer-tag">&lt;/about&gt;</span>
      </div>
    </section>
  );
}
