import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export const EMAIL = 'huyng38456@gmail.com';

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

// ── One column of the info row ────────────────────────────────────────────────
// Mirrors the three small-caps columns in the reference layout.
function InfoColumn({ label, accent, children, visible, index }) {
  return (
    <div
      style={{
        paddingTop: '28px',
        borderTop: `1px solid ${accent}30`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
      }}
    >
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: accent,
        marginBottom: '18px',
      }}>
        {label}
      </p>
      {children}
    </div>
  );
}

export default function ContactIntro() {
  const [headRef, headVisible] = useReveal(0.2);
  const [colsRef, colsVisible] = useReveal(0.15);

  // Shared style for the social pills in the "Elsewhere" column
  const socialLink = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    color: 'rgba(245,245,240,0.65)',
    textDecoration: 'none',
    padding: '7px 0',
    transition: 'color 0.2s ease, gap 0.2s ease',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .contact-link:hover { color: #f5c842 !important; gap: 14px !important; }
        .contact-email:hover { color: #f5c842 !important; }
      `}</style>

      <section style={{
        background: '#111110',
        padding: 'clamp(120px, 14vw, 180px) clamp(24px, 8vw, 120px) clamp(60px, 8vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* ── Ambient glows ── */}
        <div style={{
          position: 'absolute', top: '-5%', left: '-5%',
          width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 68%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '0%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 68%)',
          pointerEvents: 'none',
        }} />

        <div className="shell-narrow" style={{ position: 'relative' }}>

          {/* ── Headline ── */}
          <div
            ref={headRef}
            style={{
              marginBottom: 'clamp(56px, 8vw, 96px)',
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
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
              Get in touch
            </p>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 900,
                color: '#f5f5f0',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                Contact
              </h1>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 700,
                color: '#f5c842',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                Me
              </h1>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '2px', background: '#f5c842', flexShrink: 0 }} />
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.95rem',
                color: 'rgba(245,245,240,0.4)',
                margin: 0,
                maxWidth: '460px',
                lineHeight: 1.6,
              }}>
                Roles, collaborations, or just a good problem to talk through —
                the inbox is open.
              </p>
            </div>
          </div>

          {/* ── Three-column info row ── */}
          <div
            ref={colsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: 'clamp(32px, 5vw, 64px)',
            }}
          >
            <InfoColumn label="Email" accent="#f5c842" visible={colsVisible} index={0}>
              <a
                href={`mailto:${EMAIL}`}
                className="contact-email"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.95rem',
                  color: 'rgba(245,245,240,0.75)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'color 0.2s ease',
                  wordBreak: 'break-all',
                }}
              >
                <Mail size={16} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                {EMAIL}
              </a>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                color: 'rgba(245,245,240,0.3)',
                marginTop: '10px',
                lineHeight: 1.6,
              }}>
                Or use the form below — it lands in the same place.
              </p>
            </InfoColumn>

            <InfoColumn label="Elsewhere" accent="#60a5fa" visible={colsVisible} index={1}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <a
                  href="https://github.com/DaveStutler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                  style={socialLink}
                >
                  <Github size={16} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/huynguyen2002/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                  style={socialLink}
                >
                  <Linkedin size={16} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                  LinkedIn
                </a>
              </div>
            </InfoColumn>

            <InfoColumn label="Currently" accent="#4ade80" visible={colsVisible} index={2}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.95rem',
                color: 'rgba(245,245,240,0.75)',
                margin: 0,
                lineHeight: 1.7,
              }}>
                Los Angeles, CA
              </p>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '14px',
                padding: '5px 14px',
                borderRadius: '999px',
                background: 'rgba(74,222,128,0.1)',
                border: '1px solid rgba(74,222,128,0.25)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#4ade80',
              }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#4ade80', flexShrink: 0,
                }} />
                Open to opportunities
              </span>
            </InfoColumn>
          </div>
        </div>
      </section>
    </>
  );
}
