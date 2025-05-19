import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  Navbar from "../navbar/Navbar";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


    return (
        <div>
            {/* Navbar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white shadow transition-all duration-700">
                <Navbar />
            </header>

            {/* Hero Section */}
            <section className="flex items-center justify-evenly h-screen px-10 bg-base-100">
                <img
                    src="/Logo/1.png"
                    alt="Hero Logo"
                    className={`transition-all duration-700 ease-in-out ${scrolled ? "h-0" : "h-64"
                        }`}
                    style={{
                        opacity: scrolled ? 0 : 1,
                        transform: scrolled
                            ? "translateY(-40px)"
                            : "translateY(0)",
                    }}
                />
                <div className="text-right max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">
                        Hi, my name is Huy Nguyen.
                    </h1>
                    <p className="text-xl">I'm a inspired game developer. On my down time, I built accessible, digital experience on the web.</p>
                </div>
            </section>
        </div>
    );

};
