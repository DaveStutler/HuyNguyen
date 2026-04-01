import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Navbar blends into the hero on the home page:
 *  - At scroll 0 on "/": transparent background, dark text
 *  - Once scrolled past the hero (or on any other page): white/neutral bg
 *
 * The hero gradient starts at #f7e96b. The navbar sits on top of that,
 * so "transparent" naturally reveals the yellow beneath it.
 */
const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 500); 
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once immediately in case page is loaded mid-scroll
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On home + not scrolled → sit transparently over the yellow hero
  // On any other page, or once scrolled → show a solid background
  const isTransparent = isHome && !scrolled;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-300"
      style={{
        background: isTransparent
          ? "transparent"
          : "rgba(255, 255, 255, 0.85)",
        backdropFilter: isTransparent ? "none" : "blur(12px)",
        WebkitBackdropFilter: isTransparent ? "none" : "blur(12px)",
        boxShadow: isTransparent ? "none" : "0 1px 0 rgba(0,0,0,0.08)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Logo / wordmark */}
      <span
        className="font-bold text-lg tracking-tight text-neutral-900"
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
      >
        Huy.
      </span>

      {/* Nav links */}
      <div className="flex items-center gap-8">
        <Link
          to="/porfolio"
          className="text-sm font-medium text-neutral-800 hover:text-neutral-500 transition-colors"
        >
          Projects
        </Link>
        <Link
          to="/about"
          className="text-sm font-medium text-neutral-800 hover:text-neutral-500 transition-colors"
        >
          About
        </Link>
        <a
          href="mailto:huyng38456@gmail.com"
          className="px-5 py-2 rounded-full text-sm font-semibold bg-neutral-900 text-yellow-300 shadow-md transition-all duration-200 hover:bg-neutral-700 hover:shadow-lg"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Let's Talk
        </a>
      </div>
    </nav>
  );
};

export default Navbar;