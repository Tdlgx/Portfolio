"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";

/** Drifts its content down as the page scrolls past the hero, optionally fading it out. */
export default function Parallax({
  speed,
  fade = false,
  className,
  children,
}: {
  speed: number;
  fade?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = scrollY;
      if (y > innerHeight * 1.2) return;
      el.style.transform = `translateY(${y * speed}px)`;
      if (fade) el.style.opacity = String(clamp(1 - y / (innerHeight * 0.85), 0, 1));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, fade]);

  return <div ref={ref} className={className}>{children}</div>;
}
