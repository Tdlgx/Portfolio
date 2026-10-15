"use client";

import { useEffect, useRef } from "react";

/** Live clock. Uses the given IANA timezone, or the visitor's own when empty. */
export default function Clock({ timezone }: { timezone?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
    let fmt: Intl.DateTimeFormat;
    try {
      fmt = new Intl.DateTimeFormat("en-GB", timezone ? { ...opts, timeZone: timezone } : opts);
    } catch {
      fmt = new Intl.DateTimeFormat("en-GB", opts);
    }
    const tick = () => { if (ref.current) ref.current.textContent = fmt.format(new Date()); };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return <b ref={ref}>--:--:--</b>;
}

/** Current year, filled in after load so the static page never goes stale. */
export function Year() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.textContent = String(new Date().getFullYear());
  }, []);
  return <span ref={ref} />;
}
