"use client";

import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";

/** Paragraph whose words light up one by one as it scrolls into view. */
export default function AboutText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const p = ref.current;
    if (!p || prefersReducedMotion()) return;
    const words = [...p.querySelectorAll<HTMLSpanElement>(".w")];
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = p.getBoundingClientRect();
      const progress = clamp((innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.3), 0, 1);
      const lit = progress * words.length * 1.05;
      words.forEach((w, i) => { w.style.opacity = String(0.14 + 0.86 * clamp(lit - i, 0, 1)); });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [text]);

  const words = text.split(/\s+/);
  return (
    <p className="about-text" ref={ref}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w">{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
