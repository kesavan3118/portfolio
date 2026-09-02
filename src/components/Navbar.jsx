import { useEffect, useState } from "react";
import { nav, profile } from "../data/resumeData";
import "../styles/navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-inner container">
        <a
          className="navbar-brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          aria-label={`${profile.name} — home`}
        >
          <span className="navbar-mark">{initials}</span>
          <span className="navbar-name">{profile.name}</span>
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "is-active" : ""}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className={`navbar-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar-mobile ${open ? "is-open" : ""}`}>
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
