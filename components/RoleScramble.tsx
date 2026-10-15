"use client";

import { useEffect, useRef, useState } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";

const GLYPHS = "·+*×/\\<>-_=~░▒";

/** Cycles through roles, scrambling the letters between each one. */
export default function RoleScramble({ roles }: { roles: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  // React renders the first role once; after that the effect owns the text.
  const [initial] = useState(roles[0] ?? "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    let raf = 0, index = 0;

    const scramble = (to: string, dur = 900) => {
      if (reduce) { el.textContent = to; return; }
      const from = el.textContent ?? "";
      const len = Math.max(from.length, to.length);
      const t0 = performance.now();
      cancelAnimationFrame(raf);
      const step = (now: number) => {
        const p = clamp((now - t0) / dur, 0, 1);
        let out = "";
        for (let i = 0; i < len; i++) {
          const start = (i / len) * 0.6;
          if (p >= start + 0.4) out += to[i] ?? "";
          else if (p >= start) out += to[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          else out += from[i] ?? "";
        }
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    // Language changed: move from whatever is showing to the new first role
    if (el.textContent !== roles[0]) scramble(roles[0] ?? "", 700);

    const id = roles.length > 1 && !reduce
      ? setInterval(() => {
          index = (index + 1) % roles.length;
          scramble(roles[index]);
        }, 3400)
      : undefined;
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, [roles]);

  return <span className="role" ref={ref}>{initial}</span>;
}
