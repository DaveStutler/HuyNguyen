import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { projects } from '../../assets/data/projects.json'


const Navbar = () => {
  const navigate = useNavigate();
  const logoLight = `${import.meta.env.BASE_URL}Logo/1.png`;
  const logoDark = `${import.meta.env.BASE_URL}Logo/2.png`;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Center Logo
  const [logoSrc, setLogoSrc] = useState(logoLight);

  useEffect(() => {
    // Check initial theme (optional, if you want to sync with system or saved theme)
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setLogoSrc(isDark ? logoDark : logoLight);
  }, []);

  const handleThemeToggle = (e) => {
    const checked = e.target.checked;
    setLogoSrc(checked ? logoDark : logoLight);
    // Optionally, set theme attribute here if you want to control theme
    document.documentElement.setAttribute("data-theme", checked ? "dark" : "light");
  };

  return (
    <nav
      className="sticky top-0 z-20 flex items-center justify-between px-8 md:px-16 py-6 hero-body"
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
        <a href="/about" className="text-sm font-medium text-neutral-800 hover:text-neutral-600 transition-colors">About</a>
        <a
          href="mailto:huyng38456@gmail.com"
          className="cta-btn px-5 py-2 rounded-full text-sm font-semibold bg-neutral-900 text-yellow-300 shadow-md"
        >
          Let's Talk
        </a>
      </div>
    </nav>
  );
}

export default Navbar;