import { profile } from "../data/resumeData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/about.css";

const FOCUS_AREAS = [
  "Responsive web development",
  "RESTful APIs",
  "JWT authentication",
  "MongoDB integration",
  "Booking management",
  "Role-based access control",
];

export default function About() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">About</h2>
          <span className="index">01 / About</span>
        </div>

        <div ref={ref} className={`about-layout reveal ${visible ? "is-visible" : ""}`}>
          <p className="about-summary">{profile.summary}</p>

          <div className="about-focus glass">
            <p className="about-focus-label">Areas of expertise</p>
            <ul className="about-focus-list">
              {FOCUS_AREAS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
