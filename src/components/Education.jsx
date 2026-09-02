import { education } from "../data/resumeData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/education.css";

export default function Education() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Education</h2>
          <span className="index">04 / Education</span>
        </div>

        <div ref={ref} className={`timeline reveal ${visible ? "is-visible" : ""}`}>
          {education.map((item, i) => (
            <div className="timeline-item" key={item.degree} style={{ transitionDelay: `${i * 140}ms` }}>
              <div className="timeline-marker">
                <span className="timeline-dot" />
                {i < education.length - 1 && <span className="timeline-line" />}
              </div>
              <div className="timeline-content glass">
                <p className="timeline-duration">{item.duration}</p>
                <h3 className="timeline-degree">{item.degree}</h3>
                <p className="timeline-institution">{item.institution}</p>
                <p className="timeline-cgpa">CGPA: {item.cgpa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
