import { useEffect, useRef, useState } from "react";

/**
 * Attach the returned ref to any element to have it receive the
 * `.is-visible` class (via the boolean return value) once it scrolls
 * into view. Used together with the .reveal utility class in index.css.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}
