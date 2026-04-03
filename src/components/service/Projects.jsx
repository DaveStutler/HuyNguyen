import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../assets/data/projects.json';

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ── Tag color cycling ─────────────────────────────────────────────────────────
const TAG_COLORS = ['#f5c842', '#60a5fa', '#4ade80', '#f472b6', '#a78bfa'];
const tagColor = (i) => TAG_COLORS[i % TAG_COLORS.length];

// ── Intersection reveal hook ──────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const color = tagColor(index);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '16px',
        border: `1px solid ${hovered ? `${color}35` : 'rgba(255,255,255,0.07)'}`,
        background: hovered ? `${color}05` : 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-5px)' : 'translateY(0)'
          : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.1}s,
                     transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s,
                     border-color 0.25s ease,
                     background 0.25s ease`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Image ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '16/9',
        background: '#1a1a19',
        flexShrink: 0,
      }}>
        <img
          src={`${import.meta.env.BASE_URL}${project.image}`}
          alt={project.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
            filter: hovered ? 'brightness(1)' : 'brightness(0.85)',
          }}
        />
        {/* Status chip over image */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          padding: '4px 10px',
          borderRadius: '999px',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          background: 'rgba(10,10,10,0.75)',
          backdropFilter: 'blur(6px)',
          color: color,
          border: `1px solid ${color}35`,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {project.status}
        </span>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span key={i} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '2px 8px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(245,245,240,0.35)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          fontWeight: 700,
          color: '#f5f5f0',
          lineHeight: 1.2,
          marginBottom: '10px',
        }}>
          {project.name}
        </h3>

        {/* Accent line */}
        <div style={{
          width: hovered ? '36px' : '20px',
          height: '2px',
          background: color,
          marginBottom: '12px',
          transition: 'width 0.3s ease',
        }} />

        {/* Preview text */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.88rem',
          color: 'rgba(245,245,240,0.42)',
          lineHeight: 1.7,
          flex: 1,
          marginBottom: '20px',
        }}>
          {project.preview}
        </p>

        {/* Read more link */}
        <Link
          to={`/projects/${slugify(project.name)}`}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'gap 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.gap = '10px'}
          onMouseLeave={e => e.currentTarget.style.gap = '6px'}
        >
          Read more <span>→</span>
        </Link>
      </div>
    </div>
  );
}

// ── Main Projects section ─────────────────────────────────────────────────────
export default function Projects() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [gridRef,   gridVisible]   = useReveal(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <section
        id="projects"
        style={{
          background: '#0e0e0d',
          padding: 'clamp(60px, 10vw, 120px) clamp(24px, 8vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '5%', right: '-5%',
          width: '450px', height: '450px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,200,66,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          style={{
            marginBottom: 'clamp(40px, 6vw, 64px)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#f5c842',
            marginBottom: '12px',
          }}>
            Selected Work
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 900,
              color: '#f5f5f0',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              My
            </h2>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 700,
              color: '#f5c842',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Projects
            </h2>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '2px', background: '#f5c842', flexShrink: 0 }} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.9rem',
              color: 'rgba(245,245,240,0.35)',
              margin: 0,
            }}>
              Games, web platforms, and systems — built end to end.
            </p>
          </div>
        </div>

        {/* ── Project grid ── */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '20px',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              visible={gridVisible}
            />
          ))}
        </div>
      </section>
    </>
  );
}