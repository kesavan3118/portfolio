import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Returns { x, y } in the range [-1, 1], representing the pointer's
 * position relative to the viewport center. Stays at { x: 0, y: 0 }
 * on touch devices or when the user prefers reduced motion, so no
 * component needs to special-case that itself.
 */
export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let raf = null;
    const handleMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setPos({ x, y });
        raf = null;
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return pos;
}
