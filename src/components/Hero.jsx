import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animasiData from '../components/assets/Programming Computer.json';

gsap.registerPlugin(SplitText);

const Hero = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  // const audioRef = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [duration, setDuration] = useState('0:00');
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || 'dark';
  });

  const themeStyles = {
    dark: {
      bg: 'linear-gradient(135deg, #040507 0%, #0a0d12 50%, #050608 100%)',
      halo: 'radial-gradient(circle at 32% 24%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.12) 16%, rgba(255,255,255,0) 42%), radial-gradient(circle at 68% 66%, rgba(255,214,170,0.12) 0%, rgba(255,214,170,0) 55%)',
      vignette: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%)',
      heading: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
      secondary: 'rgba(255,255,255,0.7)',
      accent: '#ffffff',
    },
    light: {
      bg: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #e0e7ff 100%)',
      halo: 'radial-gradient(circle at 32% 24%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.45) 16%, rgba(255,255,255,0) 42%), radial-gradient(circle at 68% 66%, rgba(255,206,160,0.25) 0%, rgba(255,206,160,0) 55%)',
      vignette: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.15) 100%)',
      heading: 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)',
      secondary: 'rgba(51,65,85,0.75)',
      accent: '#1f2937',
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          const current = document.documentElement.dataset.theme;
          setTheme(current || 'dark');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);


  useGSAP(() => {
    gsap.set("#nama", { overflow: "hidden" });
    gsap.set([".hero-subtitle", ".hero-description", ".scroll-text", ".scroll-arrow", ".github-container"], {
      opacity: 1,
      y: 0
    });

    let mm = gsap.matchMedia();

    const createTypewriterLoop = (chars, speed) => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });
      
      gsap.set(chars, { 
        opacity: 0, 
        y: 12, 
        scale: 0.3, 
        rotateX: -90,
        rotateY: -45,
        rotateZ: -30,
        transformOrigin: "50% 50%",
        filter: "blur(8px)"
      });
      
      // Enter animation - Minecraft Explosion Effect
      tl.to(chars, {
        opacity: 1,
        y: 0,
        scale: 1.3,
        rotateX: 15,
        rotateY: 0,
        rotateZ: 0,
        filter: "blur(0px)",
        duration: speed * 0.6,
        ease: "back.out(1.8)",
        stagger: {
          each: speed,
          from: "start"
        }
      })
      .to(chars, {
        scale: 1,
        rotateX: 0,
        duration: speed * 0.3,
        ease: "power2.inOut",
        stagger: {
          each: speed,
          from: "start"
        }
      }, 0)
      // Bounce effect (soft)
      .to(chars, {
        y: -6,
        duration: 0.4,
        ease: "sine.inOut",
        stagger: {
          each: 0.03,
          from: "start",
          yoyo: true,
          repeat: 1
        }
      })
      .to({}, { duration: 1.5 })
      // Exit animation
      .to(chars, {
        opacity: 0,
        y: -25,
        scale: 0.7,
        rotateX: 70,
        duration: speed * 0.35,
        ease: "power2.in",
        stagger: {
          each: speed * 0.4,
          from: "end"
        },
      });
      
      return tl;
    };

    mm.add("(min-width: 768px)", () => {
      const mainTl = gsap.timeline();

      mainTl.to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      })
      .to(".hero-description", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      }, "-=1")
      .to(".github-container", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      }, "-=0.8")
      .add(() => {
        const chars = gsap.utils.toArray("#nama .char");
        createTypewriterLoop(chars, 0.09);
      }, "-=0.5")
      .to(".scroll-text", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.3")
      .to(".scroll-arrow", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      }, "-=0.5");
    });

    mm.add("(max-width: 767px)", () => {
      const mainTl = gsap.timeline();

      mainTl.to(".hero-subtitle", { opacity: 1, y: 0, duration: 1 })
        .add(() => {
          const chars = gsap.utils.toArray("#nama .char");
          createTypewriterLoop(chars, 0.07);
        }, "-=0.4")
        .to(".hero-description", { opacity: 1, y: 0, duration: 1 }, "-=0.6")
        .to(".github-container", { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.4")
        .to(".scroll-text", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(".scroll-arrow", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
    });

    // Enhanced scroll arrow animation
    gsap.to(".scroll-arrow", {
      y: -15,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3
    });

  }, []);

  const renderNameWithSpans = () => {
    const name = "Muhammad Yusri";
    return name.split('').map((char, index) => (
      <span key={index} className="char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <header
      ref={sectionRef}
      id="home"
      role="banner"
      style={{ 
        fontFamily: "Sora Variable",
        color: themeStyles[theme].accent
      }}
      className={`font-sora flex flex-col items-center justify-center relative min-h-screen overflow-hidden md:pt-20 theme-${theme}`}
    >
      {/* Elegant Background - keep halo, drop vignette to avoid section edge darkening */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: themeStyles[theme].halo }} />
      </div>

      {/* Main Content Container - Adjusted spacing */}
      <div
        ref={containerRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center">
          
          {/* ================= LEFT CONTENT ================= */}
          <div className="text-center lg:text-left">
            <h1
              className="text-5xl sm:text-5xl md:text-6xl lg:text-[50px] xl:text-[60px] font-bold leading-tight mb-6 tracking-tight"
              id="nama"
              style={{
                color: themeStyles[theme].accent,
                textShadow:
                  theme === "dark"
                    ? "0 0 30px rgba(255,255,255,0.3)"
                    : "0 0 18px rgba(15,23,42,0.12)",
              }}
            >
              {renderNameWithSpans()}
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl hero-subtitle font-semibold tracking-[0.08em] uppercase mb-4">
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: themeStyles[theme].heading,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Hi, I'm
              </span>
            </p>

            {/* Role */}
            <div className="mt-6">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-semibold tracking-[0.12em] uppercase">
                <span
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: themeStyles[theme].heading,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  Web Developer - Internet of Things (IoT)
                </span>
              </h2>
            </div>

            {/* Hobby */}
            <div className="mt-2">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-medium tracking-[0.08em]">
                <span
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: themeStyles[theme].heading,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  Back-End Web Enthusiast
                </span>
              </p>
            </div>

            <p
              className="text-base sm:text-lg mt-6 max-w-2xl italic"
              style={{ color: themeStyles[theme].secondary }}
            >
              Assisting businesses and individuals in building effective and automated website system and IoT solutions
            </p>

            {/* GitHub Button */}
            <div className="mt-8 lg:mt-12">
              <a
                href="https://github.com/UchihaDadang"
                target="_blank"
                rel="noopener noreferrer"
                className="github-glow-btn group"
              >
                <svg
                  className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.02c0 4.43 2.865 8.19 6.839 9.52.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.56 9.56 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.48A10.025 10.025 0 0022 12.02C22 6.484 17.523 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="tracking-widest uppercase text-sm font-semibold">
                  GitHub
                </span>

                {/* Shine layer */}
                <span className="shine-layer" />
              </a>
            </div>
          </div>

          {/* ================= RIGHT CONTENT (IMAGE) ================= */}
          <div className="hidden lg:block justify-center items-center lg:justify-end w-full h-[420px] lg:h-[520px]">
              <DotLottieReact
                data={animasiData}
                loop
                autoplay
                className="w-[600px] h-[600px]"
              />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100vh) translateX(100px) rotate(180deg); 
            opacity: 0; 
          }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }

        .typing-cursor {
          animation: blink 0.8s infinite;
        }

        .github-glow-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1.8rem;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #0f172a, #020617);
          color: #e5e7eb;
          text-decoration: none;
          overflow: hidden;
          box-shadow:
            0 0 20px rgba(0, 255, 255, 0.15),
            inset 0 0 10px rgba(255, 255, 255, 0.05);
          transition: all 0.4s ease;
        }

        .github-glow-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 35px rgba(0, 255, 255, 0.4),
            0 0 60px rgba(255, 0, 255, 0.25);
        }

        .github-glow-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(0, 255, 255, 0.35),
            rgba(255, 0, 255, 0.35),
            transparent
          );
          opacity: 0;
          transition: opacity 0.4s;
        }

        .github-glow-btn:hover::before {
          opacity: 1;
        }

        .shine-layer {
          position: absolute;
          inset: -40%;
          background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(255, 255, 255, 0.4),
            transparent 70%
          );
          transform: translateX(-100%);
          animation: shine 3.5s infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          60% {
            transform: translateX(120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes pulse-fast {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes text-glitch-1 {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          2% {
            transform: translate(-2px, 1px);
            opacity: 0.8;
          }
          4% {
            transform: translate(0);
            opacity: 0;
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }

        @keyframes text-glitch-2 {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          2% {
            transform: translate(2px, -1px);
            opacity: 0.8;
          }
          4% {
            transform: translate(0);
            opacity: 0;
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }

        .char {
          display: inline-block;
          position: relative;
        }

        .char::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #00fff9, #ff00de);
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }

        .char:hover::before {
          opacity: 0.3;
        }

      `}</style>
    </header>
  );
};

export default Hero;