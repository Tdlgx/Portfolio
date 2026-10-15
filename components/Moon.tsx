"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const TILT = (-16 * Math.PI) / 180;

/** Profile photo shown as a moon with a small satellite on a tilted orbit. */
export default function Moon({ photo, name, emptyLabel }: { photo: string; name: string; emptyLabel: string }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const moonletRef = useRef<HTMLSpanElement>(null);

  // Photo load state (the image may finish before hydration, so check `complete` too)
  useEffect(() => {
    const img = imgRef.current, box = photoRef.current;
    if (!box) return;
    if (!photo || !img) { box.classList.add("empty"); return; }
    const ok = () => box.classList.add("loaded");
    const fail = () => box.classList.add("empty");
    if (img.complete) (img.naturalWidth > 0 ? ok : fail)();
    img.addEventListener("load", ok);
    img.addEventListener("error", fail);
    return () => {
      img.removeEventListener("load", ok);
      img.removeEventListener("error", fail);
    };
  }, [photo]);

  // Orbit
  useEffect(() => {
    const moon = moonRef.current, dot = moonletRef.current;
    if (!moon || !dot) return;
    const reduce = prefersReducedMotion();
    let theta = Math.PI * 0.15, last = 0, raf = 0;
    const loop = (t: number) => {
      const dt = last ? Math.min(t - last, 50) : 16;
      last = t;
      if (!reduce) theta += dt * 0.00042;
      const size = moon.offsetWidth;
      const k = (size * 1.64) / 200; // svg units -> px
      const ex = 95 * Math.cos(theta), ey = 24 * Math.sin(theta);
      const X = ex * Math.cos(TILT) - ey * Math.sin(TILT);
      const Y = ex * Math.sin(TILT) + ey * Math.cos(TILT);
      const front = Math.sin(theta) > 0;
      const scale = 0.75 + (0.45 * (Math.sin(theta) + 1)) / 2;
      dot.style.zIndex = front ? "3" : "0";
      dot.style.opacity = front ? "1" : ".55";
      dot.style.transform = `translate(${size / 2 + X * k}px, ${size / 2 + Y * k}px) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Tilt toward the cursor
  useEffect(() => {
    const zone = zoneRef.current, box = photoRef.current;
    if (!zone || !box || prefersReducedMotion()) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = box.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      box.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
      box.style.setProperty("--gx", (x + 0.5) * 100 + "%");
      box.style.setProperty("--gy", (y + 0.5) * 100 + "%");
    };
    const leave = () => { box.style.transform = ""; };
    zone.addEventListener("pointermove", move);
    zone.addEventListener("pointerleave", leave);
    return () => {
      zone.removeEventListener("pointermove", move);
      zone.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="moon-zone" ref={zoneRef}>
      <div className="moon" ref={moonRef}>
        <div className="halo" />
        <svg className="orbit back" viewBox="-100 -100 200 200" aria-hidden="true">
          <ellipse cx="0" cy="0" rx="95" ry="24" transform="rotate(-16)" />
        </svg>
        <div className="photo" ref={photoRef}>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element -- plain img so a missing file falls back to the placeholder
            <img ref={imgRef} src={photo} alt={name} />
          )}
          <div className="photo-empty">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <circle cx="32" cy="24" r="11" />
              <path d="M12 56c2-11 10-17 20-17s18 6 20 17" />
            </svg>
            <span>{emptyLabel}</span>
          </div>
        </div>
        <svg className="orbit front" viewBox="-100 -100 200 200" aria-hidden="true">
          <path d="M -95 0 A 95 24 0 0 0 95 0" transform="rotate(-16)" />
        </svg>
        <span className="moonlet" ref={moonletRef} />
      </div>
    </div>
  );
}
