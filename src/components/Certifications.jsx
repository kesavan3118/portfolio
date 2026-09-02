import { certifications } from "../data/resumeData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/certifications.css";

export default function Certifications() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="certifications" className="section section--tight">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Training &amp; Certification</h2>
          <span className="index">05 / Certifications</span>
        </div>

        <div ref={ref} className={`cert-grid reveal ${visible ? "is-visible" : ""}`}>
          {certifications.map((c) => (
            <div className="cert-card glass" key={c.name}>
              <span className="cert-icon" aria-hidden="true">
                ✦
              </span>
              <div>
                <p className="cert-name">{c.name}</p>
                <p className="cert-detail">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
