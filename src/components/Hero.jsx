import { useEffect, useState } from "react";
import { profile } from "../data/resumeData";
import { useMousePosition } from "../hooks/useMousePosition";
import "../styles/hero.css";

export default function Hero() {
  const mouse = useMousePosition();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tiltX = mouse.y * -6;
  const tiltY = mouse.x * 8;
  const shiftX = mouse.x * 14;
  const shiftY = mouse.y * 14;

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className={`hero-copy ${entered ? "is-entered" : ""}`}>
          <p className="hero-kicker">Full Stack Web Developer · Fresher</p>
          <h1 className="hero-title">
            {profile.name}
          </h1>
          <p className="hero-summary">{profile.heroSummary}</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
              View Projects
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo("contact")}>
              Contact Me
            </button>
          </div>
        </div>

        <div className={`hero-visual ${entered ? "is-entered" : ""}`}>
          <div
            className="hero-portrait-stage"
            style={{ transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }}
          >
            <div
              className="hero-portrait-glow"
              style={{ transform: `translate(${shiftX}px, ${shiftY}px)` }}
            />
            <div className="hero-portrait-ring" />
            <div className="hero-portrait-frame glass">
              <img
                src="/assets/profile.png"
                alt={`${profile.name}, ${profile.title}`}
                className="hero-portrait-img"
              />
            </div>
            <div
              className="hero-chip hero-chip-a glass"
              style={{ transform: `translate(${shiftX * 0.6}px, ${shiftY * 0.6}px)` }}
            >
              <span className="dot" /> MERN Stack
            </div>
            <div
              className="hero-chip hero-chip-b glass"
              style={{ transform: `translate(${-shiftX * 0.5}px, ${-shiftY * 0.5}px)` }}
            >
              JWT · REST APIs
            </div>
          </div>
        </div>
      </div>

      <button className="hero-scrollcue" onClick={() => scrollTo("about")} aria-label="Scroll to About section">
        <span className="hero-scrollcue-line" />
        Scroll
      </button>
    </section>
  );
}
