import { useEffect, useRef, useState } from 'react';
import './Body.css';

const skills = [
  { label: 'Unity / Unreal',  color: '#f5c842' },
  { label: 'C# / C++',        color: '#f5c842' },
  { label: 'React',           color: '#60a5fa' },
  { label: 'Node.js',         color: '#60a5fa' },
  { label: 'Django',          color: '#60a5fa' },
  { label: 'Python',          color: '#60a5fa' },
  { label: 'AWS / GCP',       color: '#4ade80' },
  { label: 'Docker',          color: '#4ade80' },
  { label: 'Game Design',     color: '#f5c842' },
  { label: 'Full-Stack Dev',  color: '#60a5fa' },
];

const stats = [
  { value: '5+',  label: 'Projects shipped' },
  { value: '2',   label: 'Degrees earned' },
  { value: '3',   label: 'Years experience' },
];

// ── Reusable hook: fires once when element enters viewport ───────────────────
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

export default function Body() {
  const [photoRef, photoVisible]   = useReveal(0.2);
  const [textRef,  textVisible]    = useReveal(0.2);
  const [statsRef, statsVisible]   = useReveal(0.3);

  const photoSrc = `${import.meta.env.BASE_URL}profilePic2.jpg`;

  return (
    <>
      <section
        style={{
          background: '#111110',
          padding: 'clamp(60px, 10vw, 120px) clamp(24px, 8vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Ambient glow ── */}
        <div style={{
          position: 'absolute', top: '20%', left: '-8%',
          width: '360px', height: '360px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,200,66,0.055) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '-5%',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ── Section eyebrow ── */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#f5c842',
            marginBottom: '12px',
          }}>
            About me
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
              Who
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
              I Am
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
              Builder. Designer. Storyteller.
            </p>
          </div>
        </div>

        {/* ── Main two-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
          maxWidth: '1100px',
        }}>

          {/* ── LEFT: Photo ── */}
          <div
            ref={photoRef}
            style={{
              opacity: photoVisible ? 1 : 0,
              transform: photoVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>

              {/* Offset shadow card */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: '#f5c842',
                borderRadius: '20px',
                transform: 'translate(10px, 10px)',
                opacity: 0.25,
                zIndex: 0,
              }} />

              {/* Photo */}
              <img
                src={photoSrc}
                alt="Huy Nguyen"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  maxWidth: '440px',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  borderRadius: '20px',
                  display: 'block',
                  background: '#1d1d1c',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              />

              {/* Floating label — mirroring hero's caption pill */}
              <div style={{
                position: 'absolute',
                bottom: '18px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                padding: '7px 16px',
                borderRadius: '999px',
                background: 'rgba(10,10,10,0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                whiteSpace: 'nowrap',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                color: 'rgba(245,245,240,0.8)',
                letterSpacing: '0.04em',
              }}>
                B.S. Computer Science · UC Davis
              </div>
            </div>

            {/* ── Stat row below photo ── */}
            <div
              ref={statsRef}
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '20px',
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="stat-card"
                  style={{
                    flex: 1,
                    padding: '14px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: '#f5c842',
                    lineHeight: 1,
                    margin: 0,
                  }}>
                    {s.value}
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '11px',
                    color: 'rgba(245,245,240,0.35)',
                    marginTop: '6px',
                    letterSpacing: '0.05em',
                    lineHeight: 1.3,
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Bio + skills ── */}
          <div
            ref={textRef}
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }}
          >
            {/* Status pill */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              borderRadius: '999px',
              background: 'rgba(74,222,128,0.1)',
              border: '1px solid rgba(74,222,128,0.25)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#4ade80',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: '28px',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#4ade80',
                animation: 'pulse 2s infinite',
                flexShrink: 0,
              }} />
              Open to opportunities
            </span>

            {/* Bio paragraphs */}
            <div style={{ fontFamily: "'DM Sans', sans-serif", marginBottom: '32px' }}>
              <p style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                color: 'rgba(245,245,240,0.75)',
                lineHeight: 1.8,
                marginBottom: '18px',
              }}>
                I'm a Master's student in{' '}
                <strong style={{ color: '#f5f5f0', fontWeight: 500 }}>Computer Science — Game Development</strong>{' '}
                at the University of Southern California, with a deep interest in building things that are both
                technically strong and genuinely fun to use.
              </p>
              <p style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                color: 'rgba(245,245,240,0.75)',
                lineHeight: 1.8,
                marginBottom: '18px',
              }}>
                My work spans gameplay systems and 2D/3D animation in Unity, full-stack web platforms
                with Django and React, and cloud infrastructure — always with a focus on
                polish and{' '}
                <em style={{ color: '#f5c842' }}>purposeful design</em>.
              </p>
              <p style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                color: 'rgba(245,245,240,0.5)',
                lineHeight: 1.8,
              }}>
                Outside of code I'm thinking about narrative design, game feel, and how
                interactive experiences can tell stories no other medium can.
              </p>
            </div>

            {/* Skills label */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(245,245,240,0.28)',
              marginBottom: '14px',
            }}>
              Skills &amp; tools
            </p>

            {/* Skill chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="skill-chip"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                    background: `${skill.color}12`,
                    color: skill.color,
                    border: `1px solid ${skill.color}28`,
                    opacity: textVisible ? 1 : 0,
                    transform: textVisible ? 'translateY(0)' : 'translateY(8px)',
                    transition: `opacity 0.4s ease ${0.15 + i * 0.04}s, transform 0.4s ease ${0.15 + i * 0.04}s`,
                  }}
                >
                  {skill.label}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  background: '#f5c842',
                  color: '#111110',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,200,66,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Download Résumé
              </a>
              <a
                href="mailto:huyng38456@gmail.com"
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  background: 'transparent',
                  color: 'rgba(245,245,240,0.65)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  border: '1px solid rgba(255,255,255,0.12)',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#f5f5f0';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(245,245,240,0.65)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }}
              >
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}