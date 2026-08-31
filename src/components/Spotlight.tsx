"use client";

import { useEffect, useRef } from "react";

/**
 * Soft gold light that follows the pointer across the hero. Written straight to
 * CSS variables so it never triggers a React re-render.
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const section = node.parentElement;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      node.style.setProperty("--x", `${event.clientX - rect.left}px`);
      node.style.setProperty("--y", `${event.clientY - rect.top}px`);
      node.style.opacity = "1";
    };

    const onLeave = () => {
      node.style.opacity = "0";
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(228,200,120,0.13), transparent 70%)",
      }}
    />
  );
}
