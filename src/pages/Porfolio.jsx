import { useEffect, useRef, useState } from 'react';
import Projects from '../components/service/Projects';
import { collaborators } from '../assets/data/collaborators.json';

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

// ── Single collaborator card ──────────────────────────────────────────────────
function CollabCard({ person, index, visible }) {
  const [hovered, setHovered] = useState(false);

  // Initials from name
  const initials = person.name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('');

  // Cycle accent colors
  const colors = ['#f5c842', '#60a5fa', '#4ade80', '#f472b6', '#a78bfa'];
  const color  = colors[index % colors.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '24px',
        borderRadius: '14px',
        border: `1px solid ${hovered ? `${color}35` : 'rgba(255,255,255,0.07)'}`,
        background: hovered ? `${color}06` : 'rgba(255,255,255,0.02)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 0.08}s,
                     transform 0.45s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s,
                     border-color 0.25s ease,
                     background 0.25s ease`,
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* ── Avatar + name row ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Try image, fall back to initials */}
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
          background: `${color}18`,
          border: `1px solid ${color}30`,
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px', fontWeight: 600, color,
        }}>
          <img
            src={`${import.meta.env.BASE_URL}${person.avatar}`}
            alt={person.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.querySelector('.collab-initials').style.display = 'flex';
            }}
          />
          <span
            className="collab-initials"
            style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
          >
            {initials}
          </span>
        </div>

        <div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1rem', fontWeight: 700,
            color: '#f5f5f0', margin: 0, marginBottom: '3px',
            lineHeight: 1.2,
          }}>
            {person.name}
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.78rem',
            color: color,
            margin: 0, letterSpacing: '0.02em',
          }}>
            {person.title}
          </p>
        </div>
      </div>

      {/* Affiliation + project */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {person.affiliation && (
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: '999px',
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(245,245,240,0.4)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {person.affiliation}
          </span>
        )}
        {person.project && (
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: '999px',
            background: `${color}10`,
            color: color,
            border: `1px solid ${color}20`,
          }}>
            {person.project}
          </span>
        )}
      </div>

      {/* Note */}
      {person.note && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.84rem',
          color: 'rgba(245,245,240,0.38)',
          lineHeight: 1.65,
          margin: 0,
        }}>
          {person.note}
        </p>
      )}

      {/* LinkedIn link */}
      {person.linkedin && (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(245,245,240,0.25)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            marginTop: 'auto',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={e => e.currentTarget.style.color = color}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,240,0.25)'}
        >
          LinkedIn ↗
        </a>
      )}
    </div>
  );
}

// ── Collaborators section ─────────────────────────────────────────────────────
function CollaboratorsSection() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [gridRef,   gridVisible]   = useReveal(0.1);

  // Show all or featured toggle
  const [showAll, setShowAll] = useState(false);
  const featured  = collaborators.filter(c => c.notable);
  const displayed = showAll ? collaborators : featured;

  return (
    <section style={{
      background: '#111110',
      padding: 'clamp(60px, 10vw, 120px) clamp(24px, 8vw, 120px)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: '-5%', right: '5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Header ── */}
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
          fontSize: '0.75rem', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#60a5fa', marginBottom: '12px',
        }}>
          People I've worked with
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 900, color: '#f5f5f0',
            lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0,
          }}>
            Notable
          </h2>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 700, color: '#60a5fa',
            lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0,
          }}>
            Collaborators
          </h2>
        </div>
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '48px', height: '2px', background: '#60a5fa', flexShrink: 0 }} />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9rem', color: 'rgba(245,245,240,0.35)', margin: 0,
          }}>
            Faculty, designers, engineers — people who shaped my work.
          </p>
        </div>
      </div>

      {/* ── Grid ── */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '14px',
          marginBottom: collaborators.length > featured.length ? '32px' : '0',
        }}
      >
        {displayed.map((person, i) => (
          <CollabCard
            key={person.name}
            person={person}
            index={i}
            visible={gridVisible}
          />
        ))}
      </div>

      {/* Show more / less toggle — only if there are non-featured ones */}
      {collaborators.length > featured.length && (
        <div style={{
          opacity: gridVisible ? 1 : 0,
          transition: 'opacity 0.5s ease 0.4s',
        }}>
          <button
            onClick={() => setShowAll(v => !v)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '11px 28px', borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'transparent',
              color: 'rgba(245,245,240,0.45)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(96,165,250,0.4)';
              e.currentTarget.style.color = '#60a5fa';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.color = 'rgba(245,245,240,0.45)';
            }}
          >
            {showAll
              ? `Show featured only ↑`
              : `Show all ${collaborators.length} collaborators ↓`}
          </button>
        </div>
      )}
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Porfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
      <div style={{ paddingTop: '70px' }}> {/* clears fixed navbar */}
        <Projects />
        <CollaboratorsSection />
      </div>
    </>
  );
}