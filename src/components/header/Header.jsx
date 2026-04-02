import { useEffect, useRef, useState } from 'react';

// ── What I do — three pillars ─────────────────────────────────────────────────
const pillars = [
  {
    number: '01',
    title: 'Game Development',
    color: '#f5c842',
    description:
      'Building immersive 2D and 3D experiences in Unity and Unreal — from gameplay systems and AI to animation, level design, and multiplayer networking.',
    tags: ['Unity', 'C#', 'Unreal', 'Game AI', 'Multiplayer'],
  },
  {
    number: '02',
    title: 'Full-Stack Web',
    color: '#60a5fa',
    description:
      'Designing and shipping production-ready web apps with React on the front and Django or Node on the back — from auth and APIs to deployment and scaling.',
    tags: ['React', 'Django', 'Node.js', 'REST APIs', 'Docker'],
  },
  {
    number: '03',
    title: 'Cloud & Systems',
    color: '#4ade80',
    description:
      'Architecting scalable infrastructure with AWS and GCP, building simulation pipelines for autonomous systems, and writing performance-critical C++ and Python.',
    tags: ['AWS', 'GCP', 'C++', 'Python', 'CI/CD'],
  },
];

// ── Marquee items ─────────────────────────────────────────────────────────────
const marqueeItems = [
  'Unity',  'React', 'Django', 'C++', 'AWS', 'Game Design',
  'Node.js', 'Unreal Engine', 'Docker', 'GCP', 'Full-Stack',
  'Multiplayer', 'Python', 'Animation', 'REST APIs', 'Level Design',
];

// ── Intersection reveal hook ──────────────────────────────────────────────────
function useReveal(threshold = 0.2) {
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

// ── Marquee strip ─────────────────────────────────────────────────────────────
function Marquee() {
  // Duplicate items so the loop is seamless
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '16px 0',
      marginBottom: 'clamp(60px, 8vw, 100px)',
    }}>
      <div style={{
        display: 'flex',
        gap: '0',
        animation: 'marqueeScroll 28s linear infinite',
        width: 'max-content',
      }}>
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: i % 3 === 0
                ? 'rgba(245,200,66,0.55)'
                : i % 3 === 1
                  ? 'rgba(96,165,250,0.45)'
                  : 'rgba(245,245,240,0.2)',
              padding: '0 32px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {item}
            {/* Separator dot */}
            <span style={{
              width: '3px', height: '3px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              display: 'inline-block', flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Pillar card ───────────────────────────────────────────────────────────────
function PillarCard({ pillar, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 'clamp(24px, 3vw, 36px)',
        borderRadius: '16px',
        border: `1px solid ${hovered ? `${pillar.color}30` : 'rgba(255,255,255,0.06)'}`,
        background: hovered ? `${pillar.color}06` : 'rgba(255,255,255,0.02)',
        transition: 'border-color 0.3s ease, background 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
        transform: visible
          ? hovered ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(32px)',
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.12}s`,
        cursor: 'default',
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '0.85rem',
        fontWeight: 700,
        color: pillar.color,
        opacity: 0.5,
        letterSpacing: '0.05em',
        display: 'block',
        marginBottom: '20px',
      }}>
        {pillar.number}
      </span>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
        fontWeight: 700,
        color: '#f5f5f0',
        lineHeight: 1.2,
        marginBottom: '14px',
      }}>
        {pillar.title}
      </h3>

      {/* Accent line */}
      <div style={{
        width: hovered ? '40px' : '24px',
        height: '2px',
        background: pillar.color,
        marginBottom: '16px',
        transition: 'width 0.3s ease',
      }} />

      {/* Description */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.9rem',
        color: 'rgba(245,245,240,0.45)',
        lineHeight: 1.75,
        marginBottom: '20px',
      }}>
        {pillar.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {pillar.tags.map((tag, i) => (
          <span key={i} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '3px 10px',
            borderRadius: '999px',
            background: `${pillar.color}10`,
            color: pillar.color,
            border: `1px solid ${pillar.color}20`,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main Header section ───────────────────────────────────────────────────────
export default function Header({ scrollToProjects }) {
  const [headlineRef, headlineVisible] = useReveal(0.2);
  const [pillarsRef,  pillarsVisible]  = useReveal(0.15);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .scroll-cta:hover {
          background: rgba(245,200,66,0.12) !important;
          border-color: rgba(245,200,66,0.5) !important;
          color: #f5c842 !important;
          transform: translateY(-2px);
        }
      `}</style>

      <section style={{
        background: '#111110',
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 8vw, 120px)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* ── Ambient glows ── */}
        <div style={{
          position: 'absolute', top: '-5%', right: '10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', left: '20%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,200,66,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* ── Headline block ── */}
        <div
          ref={headlineRef}
          style={{
            marginBottom: 'clamp(40px, 6vw, 64px)',
            opacity: headlineVisible ? 1 : 0,
            transform: headlineVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Eyebrow */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#60a5fa',
            marginBottom: '16px',
          }}>
            What I do
          </p>

          {/* Big headline — wraps naturally */}
          <div style={{ maxWidth: '800px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              fontWeight: 900,
              color: '#f5f5f0',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Building things that are{' '}
              <em style={{ color: '#f5c842' }}>technically strong</em>
              {' '}and{' '}
              <em style={{ color: '#60a5fa' }}>genuinely fun</em>{' '}
              to use.
            </h2>
          </div>

          {/* Divider + subtitle */}
          <div style={{
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <div style={{ width: '48px', height: '2px', background: '#60a5fa', flexShrink: 0 }} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              color: 'rgba(245,245,240,0.4)',
              margin: 0,
              maxWidth: '480px',
              lineHeight: 1.6,
            }}>
              From game worlds to full-stack platforms — I care about
              the craft at every layer of the stack.
            </p>
          </div>
        </div>

        {/* ── Scrolling marquee ── */}
        <Marquee />

        {/* ── Three pillars ── */}
        <div
          ref={pillarsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '16px',
            marginBottom: 'clamp(48px, 7vw, 80px)',
          }}
        >
          {pillars.map((pillar, i) => (
            <PillarCard
              key={i}
              pillar={pillar}
              index={i}
              visible={pillarsVisible}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <div style={{
          opacity: pillarsVisible ? 1 : 0,
          transform: pillarsVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={scrollToProjects}
            className="scroll-cta"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              padding: '13px 32px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: 'rgba(245,245,240,0.7)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            See my projects
            <span style={{ fontSize: '16px', lineHeight: 1 }}>↓</span>
          </button>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(245,245,240,0.25)',
            margin: 0,
          }}>
            5 projects shipped across games, web, and systems.
          </p>
        </div>

      </section>
    </>
  );
}