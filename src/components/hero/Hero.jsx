import { useEffect, useState } from "react";
import './Hero.css';

// ─── Floating Tag Component ─────────────────────────────────────────────────
function FloatingTag({ label, style, delay }) {
  return (
    <span
      className="absolute px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase border border-black/20 bg-white/60 backdrop-blur-sm shadow-sm text-neutral-800"
      style={{
        ...style,
        animation: `floatDrift 6s ease-in-out infinite`,
        animationDelay: delay,
        animationFillMode: "forwards",
      }}
    >
      {label}
    </span>
  );
}

export default function Hero() {
  const logoLight = `${import.meta.env.BASE_URL}Logo/1.png`;
  const logoDark = `${import.meta.env.BASE_URL}Logo/2.png`;
  const headshotSrc = `${import.meta.env.BASE_URL}hero/headshot.png`;
  const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const t = setTimeout(() => setLoaded(true), 80);
      return () => clearTimeout(t);
    }, []);
  
    return (
      <>  
        {/* ── HERO WRAPPER ── */}
        <section
          className="hero-body relative min-h-screen overflow-hidden noise-overlay"
          style={{ background: "linear-gradient(135deg, #f7e96b 0%, #f5c842 40%, #f0a800 100%)" }}
        >
          {/* ── Background geometric accent ── */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full opacity-10"
            style={{
              background: "radial-gradient(ellipse at 80% 20%, #fff 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-20"
            style={{ background: "#e07b00", filter: "blur(80px)", transform: "translate(-30%, 30%)" }}
          />
  
          {/* ── NAV ── */}
          {/* <nav
            className="relative z-20 flex items-center justify-between px-8 md:px-16 py-6 hero-body"
            style={{
              opacity: loaded ? 1 : 0,
              animation: loaded ? "fadeIn 0.5s ease forwards" : "none",
            }}
          >
            <span
              className="font-bold text-lg tracking-tight text-neutral-900"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              Huy.
            </span>
            <div className="flex items-center gap-8">
              <a href="/portfolio" className="text-sm font-medium text-neutral-800 hover:text-neutral-600 transition-colors">Projects</a>
              <a href="/about"     className="text-sm font-medium text-neutral-800 hover:text-neutral-600 transition-colors">About</a>
              <a
                href="mailto:huyng38456@gmail.com"
                className="cta-btn px-5 py-2 rounded-full text-sm font-semibold bg-neutral-900 text-yellow-300 shadow-md"
              >
                Let's Talk
              </a>
            </div>
          </nav> */}
  
          {/* ── MAIN CONTENT GRID ── */}
          <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pb-20 grid grid-cols-1 md:grid-cols-2 gap-0 items-end min-h-[calc(100vh-88px)]">
  
            {/* ── LEFT: Typography ── */}
            <div className="flex flex-col justify-end pb-12 md:pb-24 order-2 md:order-1">
  
              {/* Status pill */}
              <div
                className="anim-slideup mb-6 self-start"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-neutral-800">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                  Open to opportunities
                </span>
              </div>
  
              {/* Name */}
              <h1
                className="hero-name anim-slideup text-neutral-900"
                style={{
                  animationDelay: "0.2s",
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                }}
              >
                Huy<br />
                <em style={{ color: "#1a1a1a" }}>Nguyen</em>
              </h1>
  
              {/* Accent bar + descriptor */}
              <div
                className="anim-slideup mt-6 flex items-center gap-4"
                style={{ animationDelay: "0.35s" }}
              >
                <div
                  style={{
                    height: 3,
                    background: "#1a1a1a",
                    animation: loaded ? "revealBar 0.8s 0.6s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                    width: 0,
                    flexShrink: 0,
                  }}
                />
                <p className="text-sm font-medium tracking-wider text-neutral-800 uppercase">
                  Game Dev &nbsp;×&nbsp; Full-Stack &nbsp;×&nbsp; Cloud
                </p>
              </div>
  
              {/* Bio blurb */}
              <p
                className="anim-slideup mt-6 text-neutral-700 leading-relaxed max-w-sm"
                style={{ animationDelay: "0.45s", fontSize: "1rem" }}
              >
                Building game-driven and web-driven experiences with creativity,
                performance, and purpose. <strong>M.S. Computer Science</strong> @ USC.
              </p>
  
              {/* CTA row */}
              <div
                className="anim-slideup mt-8 flex items-center gap-4 flex-wrap"
                style={{ animationDelay: "0.55s" }}
              >
                <a
                  href="#projects"
                  className="cta-btn px-7 py-3 rounded-full font-semibold bg-neutral-900 text-yellow-300 shadow-lg text-sm"
                >
                  View My Work
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium text-neutral-800 underline underline-offset-4 hover:text-neutral-600 transition-colors"
                >
                  My Story →
                </a>
              </div>
  
            </div>
  
            {/* ── RIGHT: Photo ── */}
            <div className="relative flex justify-center md:justify-end items-end order-1 md:order-2 pt-8 md:pt-0">
  
              {/* Floating skill tags */}
              <FloatingTag label="Unity / Unreal"  style={{ top: "10%",  left: "0%" }}  delay="0.8s" />
              <FloatingTag label="React · Node"     style={{ top: "32%",  right: "2%" }} delay="1.2s" />
              <FloatingTag label="AWS · GCP"        style={{ bottom: "28%", left: "5%" }} delay="1.6s" />
              <FloatingTag label="C++ · Python"     style={{ bottom: "10%", right: "0%" }} delay="2s"  />
  
              {/* Photo container */}
              <div
                className="photo-card anim-scalein relative"
                style={{
                  animationDelay: "0.25s",
                  width: "clamp(260px, 40vw, 480px)",
                }}
              >
                {/* Decorative offset shadow */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "#1a1a1a",
                    transform: "translate(12px, 12px)",
                    zIndex: -1,
                    borderRadius: "1.5rem",
                  }}
                />
  
                {/* Replace src with your actual photo */}
                <img
                  src={headshotSrc}
                  alt="Huy Nguyen"
                  className="w-full rounded-3xl object-cover"
                  style={{
                    aspectRatio: "3/4",
                    objectPosition: "top center",
                    display: "block",
                    background: "#e5d88a",   /* fallback while loading */
                  }}
                  onError={(e) => {
                    /* Fallback placeholder if image missing */
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.querySelector(".photo-fallback").style.display = "flex";
                  }}
                />
  
                {/* Fallback if no image */}
                <div
                  className="photo-fallback w-full rounded-3xl items-center justify-center"
                  style={{
                    aspectRatio: "3/4",
                    background: "linear-gradient(160deg, #e8d060 0%, #c8920a 100%)",
                    display: "none",
                    fontSize: "5rem",
                  }}
                >
                  🧑‍💻
                </div>
  
                {/* Caption tag — like Image 1 */}
                <div
                  className="anim-fadein absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium whitespace-nowrap"
                  style={{ animationDelay: "1s" }}
                >
                  Master's student @ USC · Class of '25
                </div>
              </div>
  
            </div>
          </div>
  
          {/* ── Scroll indicator ── */}
          <div
            className="anim-fadein absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600 hero-body"
            style={{ animationDelay: "1.2s" }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div
              className="w-px h-8 bg-neutral-600"
              style={{ animation: "floatDrift 2s ease-in-out infinite" }}
            />
          </div>
  
        </section>
      </>
    );
  }
  