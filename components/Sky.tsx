"use client";

import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";

type Star = { x: number; y: number; z: number; ph: number; sp: number };
type Ripple = { x: number; y: number; t: number };

/** Starfield background. Also starts the page intro by adding `ready` to <body>. */
export default function Sky() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const sky = ref.current;
    const ctx = sky?.getContext("2d");
    if (!sky || !ctx) return;

    const reduce = prefersReducedMotion();
    const css = getComputedStyle(document.documentElement);
    const C_STAR = css.getPropertyValue("--star").trim();
    const C_PAPER = css.getPropertyValue("--paper").trim();

    let W = 0, H = 0;
    let stars: Star[] = [];
    const pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999 };
    const ripples: Ripple[] = [];
    let introAt = 0;
    let raf = 0;
    let alive = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      sky.width = W * dpr; sky.height = H * dpr;
      sky.style.width = W + "px"; sky.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((W * H) / 4600);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.pow(Math.random(), 1.8),
        ph: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 1.4,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const fadeIn = reduce ? 1 : clamp((t - introAt) / 2400, 0, 1);
      pointer.sx += (pointer.x - pointer.sx) * 0.09;
      pointer.sy += (pointer.y - pointer.sy) * 0.09;
      const R = 170;
      const scroll = window.scrollY;
      const near: number[] = [];

      for (let i = ripples.length - 1; i >= 0; i--) if (t - ripples[i].t > 2400) ripples.splice(i, 1);

      for (const s of stars) {
        const depth = 0.04 + s.z * 0.22;
        let x = s.x;
        let y = (((s.y - scroll * depth) % H) + H) % H;
        const dx = x - pointer.sx, dy = y - pointer.sy;
        const d = Math.hypot(dx, dy) || 1;
        const f = d < R ? 1 - d / R : 0;
        const pull = f * f;
        x += (dx / d) * pull * 16;
        y += (dy / d) * pull * 16;

        let glow = 0;
        for (const r of ripples) {
          const age = t - r.t;
          const rx = x - r.x, ry = y - r.y;
          const rd = Math.hypot(rx, ry) || 1;
          const band = Math.exp(-Math.pow((rd - age * 0.55) / 46, 2)) * (1 - age / 2400);
          x += (rx / rd) * band * 18;
          y += (ry / rd) * band * 18;
          glow = Math.max(glow, band);
        }

        const tw = 0.6 + 0.4 * Math.sin(t * 0.001 * s.sp + s.ph);
        const a = ((0.12 + 0.6 * s.z) * tw + pull * 0.7 + glow * 0.8) * fadeIn;
        const rad = 0.45 + s.z * 1.15 + pull * 0.9 + glow * 0.8;
        ctx.globalAlpha = Math.min(1, a);
        ctx.fillStyle = pull > 0.08 || glow > 0.2 ? C_STAR : C_PAPER;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
        if (f > 0 && near.length < 120) near.push(x, y, f);
      }

      // Constellation lines around the cursor
      ctx.strokeStyle = C_STAR;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < near.length; i += 3) {
        for (let j = i + 3; j < near.length; j += 3) {
          const dd = Math.hypot(near[i] - near[j], near[i + 1] - near[j + 1]);
          if (dd < 105) {
            ctx.globalAlpha = (1 - dd / 105) * Math.min(near[i + 2], near[j + 2]) * 0.9 * fadeIn;
            ctx.beginPath();
            ctx.moveTo(near[i], near[i + 1]);
            ctx.lineTo(near[j], near[j + 1]);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (pointer.x < -999) { pointer.sx = e.clientX; pointer.sy = e.clientY; }
      pointer.x = e.clientX; pointer.y = e.clientY;
    };
    const onLeave = () => { pointer.x = pointer.y = -9999; };
    const onDown = (e: PointerEvent) => {
      if (!reduce) ripples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    };

    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    // Wait for fonts (max 1.2s) so the name animates in with the right typeface
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(() => {
      if (!alive) return;
      requestAnimationFrame(() => {
        introAt = performance.now();
        document.body.classList.add("ready");
        raf = requestAnimationFrame(loop);
      });
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas id="sky" ref={ref} aria-hidden="true" />;
}
