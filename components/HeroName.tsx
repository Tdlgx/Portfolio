"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";

/**
 * Name split into letters: they rise on load and hop when hovered.
 * Remount it (via `key`) to replay the rise, e.g. after a language switch.
 */
export default function HeroName({ name }: { name: string }) {
  // Mounted after the intro finished → this is a swap, so play the rise as an animation
  const [swap] = useState(() => typeof document !== "undefined" && document.body.classList.contains("ready"));

  const bump = (e: MouseEvent<HTMLSpanElement>) => {
    const ch = e.currentTarget;
    if (!document.body.classList.contains("ready") || ch.classList.contains("bump")) return;
    ch.classList.add("bump");
    ch.addEventListener("animationend", () => ch.classList.remove("bump"), { once: true });
  };

  let i = 0;
  return (
    <h1 className={swap ? "hero-name swap" : "hero-name"} aria-label={name}>
      {name.trim().split(/\s+/).map((word, wi) => (
        <span className="word" aria-hidden="true" key={wi}>
          {[...word].map((c, ci) => (
            <span className="char" key={ci} style={{ "--i": i++ } as CSSProperties} onMouseEnter={bump}>
              {c}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
