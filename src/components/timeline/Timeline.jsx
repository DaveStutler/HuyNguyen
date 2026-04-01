import { useEffect, useRef, useState, useCallback } from 'react';

// ── Timeline data ─────────────────────────────────────────────────────────────
// Add your images to /public/timeline/ and update the src paths below.
const events = [
  {
    year: '2020',
    title: 'From Garden Grove High to UC Davis',
    tag: 'Education',
    tagColor: '#f5c842',
    description:
      'Began undergraduate studies in Computer Science (B.S.). Started building foundational skills in software engineering and Python through early coursework and personal interest projects.',
    photos: [
      { src: 'timeline/davis/highschool.png', caption: 'High school Friends' },
      { src: 'timeline/davis/psy.png', caption: 'CS Peers' },
      { src: 'timeline/davis/boxingorigin.png', caption: 'Boxing Origin' },
      { src: 'timeline/davis/volleyteam.png', caption: 'Dear Friends' },
      { src: 'timeline/davis/kiyomi.png', caption: 'Outtakes' },
    ],
  },
  {
    year: '2022',
    title: 'EcoCAR Software Engineer',
    tag: 'Experience',
    tagColor: '#4ade80',
    description:
      'Joined the UC Davis EcoCAR team, contributing to simulation and testing pipelines for autonomous vehicle research. Developed virtual test environments and processed sensor data to improve software performance.',
    photos: [
      { src: 'timeline/ecocar/celebrating.jpg', caption: 'The team' },
      { src: 'timeline/ecocar/promoting.jpg', caption: 'EcoCAR Event' },
      { src: 'timeline/ecocar/latenight.jpg', caption: 'Vehicle testing' },
      { src: 'timeline/ecocar/simulation.png', caption: 'Simulation setup' },
      { src: 'timeline/ecocar/convention.jpg', caption: 'Competition day' },
    ],
  },
  {
    year: '2023',
    title: 'Academic Genealogy Project',
    tag: 'Project',
    tagColor: '#60a5fa',
    description:
      'Led a team of four to design and deploy a full-stack academic lineage tracking platform for the UC Davis CS Department — Django, RESTful APIs, CAS auth, and Docker. Wrote a 20+ page user manual.',
    photos: [
      { src: 'timeline/genealogy-1.jpg', caption: 'Launch day' },
      { src: 'timeline/genealogy-2.jpg', caption: 'Team meeting' },
      { src: 'timeline/genealogy-3.jpg', caption: 'UI mockups' },
      { src: 'timeline/genealogy-4.jpg', caption: 'Deploy setup' },
      { src: 'timeline/genealogy-5.jpg', caption: 'Demo session' },
    ],
  },
  {
    year: '2024',
    title: 'Graduated from UC Davis',
    tag: 'Milestone',
    tagColor: '#f5c842',
    description:
      'Earned B.S. in Computer Science. Focused on game AI, algorithms, and interactive design. Continued developing Unity prototypes with networking and pathfinding systems.',
    photos: [
      { src: 'timeline/graduate/ceremony.jpg', caption: 'Ceremony' },
      { src: 'timeline/graduate/catherine.jpg', caption: 'Maid of Honor' },
      { src: 'timeline/graduate/zach.jpg', caption: 'Best Man' },
      { src: 'timeline/graduate/dearfriends.png', caption: 'Class of 2024' },
      { src: 'timeline/graduate/roommie.jpg', caption: 'With family' },
      { src: 'timeline/graduate/friends.jpg', caption: 'Aggies' },
    ],
  },
  {
    year: '2024',
    title: 'Admitted to USC',
    tag: 'Education',
    tagColor: '#f5c842',
    description:
      'Began M.S. in Computer Science (Game Development) at the University of Southern California. Honing skills in game design and development.',
    photos: [
      { src: 'timeline/usc/halloween.jpg', caption: 'Event' },
      { src: 'timeline/usc/jackass.jpg', caption: 'Celebration' },
      { src: 'timeline/usc/newPeers.jpg', caption: 'New Peers' },
      { src: 'timeline/usc/uscBoxing.jpg', caption: 'USC Boxing' },
      { src: 'timeline/usc/award.jpeg', caption: 'Friends' },
      { src: 'timeline/usc/design.jpg', caption: 'Game Lab' },
    ],
  },
];

// Slight rotations to give a hand-placed polaroid feel
const ROTATIONS = [-3, 1.5, -1, 2.5, -2];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ photos, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    () => setCurrent(i => (i - 1 + photos.length) % photos.length),
    [photos.length]
  );
  const next = useCallback(
    () => setCurrent(i => (i + 1) % photos.length),
    [photos.length]
  );

  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const photo = photos[current];

  const btnStyle = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    color: '#f5f5f0',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background 0.2s',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(8,8,8,0.93)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'lbFadeIn 0.2s ease forwards',
      }}
    >
      {/* ── Close ── */}
      <button
        onClick={onClose}
        style={{ ...btnStyle, position: 'absolute', top: '20px', right: '24px', fontSize: '18px' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      >
        ✕
      </button>

      {/* ── Arrows — absolutely positioned on the overlay edges ── */}
      {photos.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          style={{ ...btnStyle, position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          ←
        </button>
      )}
      {photos.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next(); }}
          style={{ ...btnStyle, position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          →
        </button>
      )}

      {/* ── Image — constrained by both axes so any aspect ratio fits ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          /* Leave room for the absolute arrows (40px btn + 20px gap each side) */
          width: 'calc(100vw - 160px)',
          maxWidth: '860px',
        }}
      >
        <img
          key={current}
          src={`${import.meta.env.BASE_URL}${photo.src}`}
          alt={photo.caption || ''}
          style={{
            /* Let the browser pick whichever dimension hits its limit first.
               width: auto + height: auto with both max-* set is the correct
               "contain in box" pattern — avoids the stretch that width:100% causes
               on portrait images. */
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '72vh',
            borderRadius: '10px',
            display: 'block',
            background: '#181817',
            animation: 'lbSlideUp 0.22s ease forwards',
          }}
          onError={e => {
            e.currentTarget.style.width = '100%';
            e.currentTarget.style.minHeight = '260px';
          }}
        />
      </div>

      {/* ── Caption + counter ── */}
      <div onClick={e => e.stopPropagation()} style={{ marginTop: '14px', textAlign: 'center' }}>
        {photo.caption && (
          <p style={{ color: 'rgba(245,245,240,0.65)', fontSize: '0.9rem', fontFamily: "'DM Sans',sans-serif", marginBottom: '6px' }}>
            {photo.caption}
          </p>
        )}
        <p style={{ color: 'rgba(245,245,240,0.28)', fontSize: '0.72rem', letterSpacing: '0.1em', fontFamily: "'DM Sans',sans-serif" }}>
          {current + 1} / {photos.length}
        </p>
      </div>

      {/* ── Dot navigation ── */}
      {photos.length > 1 && (
        <div onClick={e => e.stopPropagation()} style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                border: 'none',
                background: i === current ? '#f5c842' : 'rgba(255,255,255,0.18)',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Polaroid photo strip ──────────────────────────────────────────────────────
function PhotoStrip({ photos, tagColor }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {photos.map((photo, i) => {
          const rot = ROTATIONS[i % ROTATIONS.length];
          const hovered = hoveredIndex === i;

          return (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              title={photo.caption}
              style={{
                padding: 0,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                // Hover: flatten rotation + scale up; idle: tilted
                transform: hovered
                  ? 'scale(1.1) rotate(0deg) translateY(-4px)'
                  : `scale(1) rotate(${rot}deg)`,
                transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                transformOrigin: 'bottom center',
                position: 'relative',
                zIndex: hovered ? 20 : i,
                filter: hovered
                  ? `drop-shadow(0 10px 28px rgba(0,0,0,0.7)) drop-shadow(0 0 1px ${tagColor}40)`
                  : 'drop-shadow(0 3px 8px rgba(0,0,0,0.5))',
              }}
            >
              {/* Polaroid frame */}
              <div
                style={{
                  background: '#1d1d1c',
                  padding: '5px 5px 18px',
                  borderRadius: '5px',
                  border: `1px solid rgba(255,255,255,${hovered ? '0.12' : '0.06'})`,
                  width: '100px',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Photo */}
                <img
                  src={`${import.meta.env.BASE_URL}${photo.src}`}
                  alt={photo.caption || ''}
                  style={{
                    width: '90px',
                    height: '72px',
                    objectFit: 'cover',
                    borderRadius: '3px',
                    display: 'block',
                    background: '#252523',
                  }}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback when image is missing */}
                <div
                  style={{
                    width: '90px',
                    height: '72px',
                    borderRadius: '3px',
                    background: `${tagColor}12`,
                    border: `1px dashed ${tagColor}25`,
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: tagColor,
                    fontSize: '22px',
                    opacity: 0.6,
                  }}
                >
                  📷
                </div>

                {/* Caption under polaroid */}
                {photo.caption && (
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '9px',
                    color: 'rgba(245,245,240,0.3)',
                    textAlign: 'center',
                    marginTop: '5px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    letterSpacing: '0.03em',
                    lineHeight: 1,
                  }}>
                    {photo.caption}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

// ── Single timeline entry ─────────────────────────────────────────────────────
function TimelineEntry({ event, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${isLeft ? '-48px' : '48px'})`,
        transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* Year (desktop) */}
      <div className="hidden md:flex flex-col items-end pr-10 shrink-0" style={{ width: '200px', paddingTop: '6px' }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(3rem, 5vw, 4.5rem)',
          fontWeight: 900,
          color: event.tagColor,
          lineHeight: 1,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease',
          transitionDelay: `${index * 0.08 + 0.2}s`,
        }}>
          {event.year}
        </span>
      </div>

      {/* Spine */}
      <div className="hidden md:flex flex-col items-center" style={{ width: '2px' }}>
        <div style={{
          width: 14, height: 14, borderRadius: '50%',
          background: event.tagColor,
          marginTop: 14, flexShrink: 0, zIndex: 10,
          boxShadow: `0 0 0 4px rgba(255,255,255,0.05), 0 0 14px ${event.tagColor}45`,
        }} />
        <div style={{ flex: 1, width: '1px', background: 'rgba(255,255,255,0.07)', minHeight: '80px' }} />
      </div>

      {/* Content */}
      <div className="flex-1 ml-0 md:ml-10 mb-16 md:mb-20" style={{ paddingTop: '6px' }}>

        {/* Year — mobile */}
        <span className="md:hidden block mb-2" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2.5rem', fontWeight: 900,
          color: event.tagColor, lineHeight: 1,
        }}>
          {event.year}
        </span>

        {/* Tag pill */}
        <span style={{
          display: 'inline-block',
          padding: '4px 12px', borderRadius: '999px',
          fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          background: `${event.tagColor}14`, color: event.tagColor,
          border: `1px solid ${event.tagColor}30`,
          fontFamily: "'DM Sans', sans-serif", marginBottom: '14px',
        }}>
          {event.tag}
        </span>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700,
          color: '#f5f5f0', lineHeight: 1.15, marginBottom: '10px',
        }}>
          {event.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.95rem', color: 'rgba(245,245,240,0.48)',
          lineHeight: 1.75, maxWidth: '480px', marginBottom: 0,
        }}>
          {event.description}
        </p>

        {/* Photos */}
        {event.photos?.length > 0 && (
          <PhotoStrip photos={event.photos} tagColor={event.tagColor} />
        )}
      </div>
    </div>
  );
}

// ── Page section ──────────────────────────────────────────────────────────────
export default function Timeline() {
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTitleVisible(true); },
      { threshold: 0.3 }
    );
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes lbFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes lbSlideUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>

      <section style={{
        background: '#111110',
        minHeight: '100vh',
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 8vw, 120px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,200,66,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Header */}
        <div ref={titleRef} style={{
          marginBottom: 'clamp(48px, 8vw, 96px)',
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f5c842', marginBottom: '12px' }}>
            The Journey
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 900, color: '#f5f5f0', lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0 }}>My</h2>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 700, color: '#f5c842', lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0 }}>Story</h2>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '2px', background: '#f5c842' }} />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.9rem', color: 'rgba(245,245,240,0.35)', margin: 0 }}>
              From UC Davis to USC — building at every step.
            </p>
          </div>
        </div>

        {/* Entries */}
        <div className="relative max-w-4xl">
          {events.map((event, i) => (
            <TimelineEntry key={i} event={event} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}