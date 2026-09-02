import { useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function ProjectCard({ project, index, expanded, onToggle }) {
  const cardRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  const handleMove = (e) => {
    if (reduced) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tiltX", `${py * -6}deg`);
    card.style.setProperty("--tiltY", `${px * 8}deg`);
    card.style.setProperty("--glowX", `${(px + 0.5) * 100}%`);
    card.style.setProperty("--glowY", `${(py + 0.5) * 100}%`);
  };

  const handleLeave = () => {
    if (reduced) return;
    const card = cardRef.current;
    card.style.setProperty("--tiltX", `0deg`);
    card.style.setProperty("--tiltY", `0deg`);
  };

  return (
    <article
      ref={cardRef}
      className={`project-card glass ${expanded ? "is-expanded" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="project-card-glow" />
      <div className="project-card-inner">
        <header className="project-card-header">
          <div>
            <p className="project-card-kicker">
              {project.type}
              {project.duration ? ` · ${project.duration}` : ""}
            </p>
            <h3 className="project-card-title">{project.name}</h3>
          </div>
          <span className="project-card-index">0{index + 1}</span>
        </header>

        <p className="project-card-desc">{project.description}</p>

        <div className="project-card-stack">
          {project.techStack.map((tech) => (
            <span key={tech} className="project-chip">
              {tech}
            </span>
          ))}
        </div>

        <div className={`project-card-details ${expanded ? "is-open" : ""}`}>
          <p className="project-card-details-label">Key features</p>
          <ul className="project-card-features">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="project-card-footer">
          <button
            className="project-card-toggle"
            onClick={onToggle}
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Show features"}
          </button>
          <div className="project-card-links">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer">
                Live
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
