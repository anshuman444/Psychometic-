import { useEffect, useRef } from 'react';

/**
 * Applies IntersectionObserver-based reveal to any element with `.reveal` inside
 * the container ref returned by this hook.
 */
export function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return rootRef;
}
