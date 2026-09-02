import { skills } from "../data/resumeData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/skills.css";

export default function Skills() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Technical Skills</h2>
          <span className="index">02 / Skills</span>
        </div>

        <div ref={ref} className={`skills-grid reveal ${visible ? "is-visible" : ""}`}>
          {skills.map((group, i) => (
            <div
              className="skill-card glass"
              key={group.category}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <p className="skill-card-title">{group.category}</p>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span className="skill-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
