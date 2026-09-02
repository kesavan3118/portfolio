import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "../styles/background.css";

// Lightweight canvas particle field — small dots drifting slowly with
// faint connecting lines when close together. Pure decoration, no
// content, so it's safe to disable entirely under reduced-motion.
export default function Background() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles, raf, dpr;

    const isSmall = window.innerWidth < 720;
    const COUNT = isSmall ? 34 : 70;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    }

    function init() {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: (Math.random() - 0.5) * 0.18 * dpr,
        r: (Math.random() * 1.4 + 0.6) * dpr,
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(155, 140, 255, 0.55)";
        ctx.fill();
      }

      const maxDist = 130 * dpr;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(38, 224, 201, ${0.12 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1 * dpr;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    init();
    tick();

    const handleResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [reduced]);

  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-a" />
      <div className="bg-glow bg-glow-b" />
      {!reduced && <canvas ref={canvasRef} className="bg-particles" />}
      <div className="bg-vignette" />
    </div>
  );
}
