import { useState } from "react";
import { projects } from "../data/resumeData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import ProjectCard from "./ProjectCard";
import "../styles/projects.css";

export default function Projects() {
  const [ref, visible] = useScrollReveal();
  const [expandedId, setExpandedId] = useState(projects[0]?.id ?? null);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Projects</h2>
          <span className="index">03 / Projects</span>
        </div>

        <div ref={ref} className={`projects-grid reveal ${visible ? "is-visible" : ""}`}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              expanded={expandedId === project.id}
              onToggle={() => setExpandedId((cur) => (cur === project.id ? null : project.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
