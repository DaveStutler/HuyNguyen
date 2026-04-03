import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../../assets/data/projects.json';

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const TAG_COLORS   = ['#f5c842', '#60a5fa', '#4ade80', '#f472b6', '#a78bfa'];
const tagColor = (i) => TAG_COLORS[i % TAG_COLORS.length];

// ── Small badge chip ──────────────────────────────────────────────────────────
function Chip({ label, color }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      background: `${color}12`,
      color,
      border: `1px solid ${color}28`,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {label}
    </span>
  );
}

// ── Main Description page ─────────────────────────────────────────────────────
export default function Description() {
  const { projectName } = useParams();
  const project = projects.find(p => slugify(p.name) === projectName);
  const [imgHovered, setImgHovered] = useState(false);

  if (!project) {
    return (
      <div style={{
        background: '#0e0e0d', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,245,240,0.4)',
        fontSize: '1.1rem',
      }}>
        Project not found.{' '}
        <Link to="/porfolio" style={{ color: '#f5c842', marginLeft: '8px' }}>← Back</Link>
      </div>
    );
  }

  // Pick a consistent accent color based on project id
  const accent = tagColor(parseInt(project.id, 10) - 1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .desc-link-btn {
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .desc-link-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <section style={{
        background: '#0e0e0d',
        minHeight: '100vh',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 120px) clamp(60px, 8vw, 100px)',
        position: 'relative',
      }}>

        {/* Ambient glow matching accent */}
        <div style={{
          position: 'absolute', top: '10%', right: '-5%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* ── Back link ── */}
          <Link
            to="/porfolio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(245,245,240,0.3)',
              textDecoration: 'none',
              marginBottom: '40px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = accent}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,240,0.3)'}
          >
            ← All Projects
          </Link>

          {/* ── Hero image ── */}
          <div
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '40px',
              border: `1px solid ${imgHovered ? `${accent}30` : 'rgba(255,255,255,0.07)'}`,
              transition: 'border-color 0.3s ease',
              position: 'relative',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}${project.image}`}
              alt={project.name}
              style={{
                width: '100%',
                maxHeight: '460px',
                objectFit: 'cover',
                display: 'block',
                transform: imgHovered ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
            {/* Status chip */}
            <span style={{
              position: 'absolute', top: '16px', right: '16px',
              padding: '5px 14px',
              borderRadius: '999px',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'rgba(10,10,10,0.8)',
              backdropFilter: 'blur(8px)',
              color: accent,
              border: `1px solid ${accent}35`,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {project.status}
            </span>
          </div>

          {/* ── Title block ── */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ width: '32px', height: '2px', background: accent, flexShrink: 0 }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: accent,
              }}>
                Project
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: '#f5f5f0',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '8px',
            }}>
              {project.name}
            </h1>
            {/* Date range */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              color: 'rgba(245,245,240,0.28)',
              letterSpacing: '0.05em',
            }}>
              {project.startDate} — {project.endDate}
            </p>
          </div>

          {/* ── Main grid: description + meta ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(32px, 5vw, 56px)',
            marginBottom: '40px',
          }}>

            {/* Description */}
            <div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                color: 'rgba(245,245,240,0.65)',
                lineHeight: 1.8,
                marginBottom: '28px',
              }}>
                {project.description}
              </p>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="desc-link-btn"
                    style={{
                      padding: '11px 24px',
                      borderRadius: '999px',
                      background: accent,
                      color: '#0e0e0d',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    View Project ↗
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="desc-link-btn"
                    style={{
                      padding: '11px 24px',
                      borderRadius: '999px',
                      background: 'transparent',
                      color: 'rgba(245,245,240,0.6)',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${accent}50`;
                      e.currentTarget.style.color = accent;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                      e.currentTarget.style.color = 'rgba(245,245,240,0.6)';
                    }}
                  >
                    View Code ↗
                  </a>
                )}
              </div>
            </div>

            {/* Meta sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

              {/* Technologies */}
              <div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(245,245,240,0.25)',
                  marginBottom: '10px',
                }}>
                  Technologies
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.technologies.map((tech, i) => (
                    <Chip key={i} label={tech} color={accent} />
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(245,245,240,0.25)',
                  marginBottom: '10px',
                }}>
                  Category
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.tags.map((tag, i) => (
                    <Chip key={i} label={tag} color="rgba(245,245,240,0.35)" />
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(245,245,240,0.25)',
                  marginBottom: '10px',
                }}>
                  Timeline
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(245,245,240,0.5)',
                }}>
                  {project.startDate} — {project.endDate}
                </p>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{
            height: '1px',
            background: 'rgba(255,255,255,0.06)',
            marginBottom: '36px',
          }} />

          {/* ── Contributors ── */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(245,245,240,0.25)',
              marginBottom: '18px',
            }}>
              Contributors
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: '10px',
            }}>
              {project.contributors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  {/* Initials avatar */}
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                    background: `${accent}18`,
                    border: `1px solid ${accent}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '11px', fontWeight: 600, color: accent,
                    letterSpacing: '0.05em',
                  }}>
                    {c.contributor.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.88rem', fontWeight: 500,
                      color: '#f5f5f0', margin: 0, marginBottom: '3px',
                      lineHeight: 1.3,
                    }}>
                      {c.contributor}
                    </p>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.78rem',
                      color: 'rgba(245,245,240,0.35)',
                      margin: 0, lineHeight: 1.4,
                    }}>
                      {c.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}