import { profile } from "../data/resumeData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/contact.css";

const CONTACT_LINKS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:+91${profile.phone}` },
  { label: "GitHub", value: "github.com/kesvavn", href: profile.github },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kesavan-m01",
    href: profile.linkedin,
  },
];

export default function Contact() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Contact</h2>
          <span className="index">06 / Contact</span>
        </div>

        <div ref={ref} className={`contact-panel glass reveal ${visible ? "is-visible" : ""}`}>
          <div className="contact-intro">
            <h3>Let's build something together.</h3>
            <p>
              Reach out directly using any of the channels below — every detail here comes straight
              from {profile.name}'s resume.
            </p>
          </div>

          <div className="contact-links">
            {CONTACT_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="contact-link"
              >
                <span className="contact-link-label">{item.label}</span>
                <span className="contact-link-value">{item.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
