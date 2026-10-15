"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { switchLang, ui, useLang } from "@/lib/lang";

const SECTIONS = ["about", "work", "experience", "contact"] as const;

/** Top bar: hides while scrolling down, marks the section in view, switches language. */
export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState("");
  const lang = useLang();
  const t = ui[lang];
  const initials = profile.content[lang].name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      if (Math.abs(y - lastY) < 4) return;
      nav.classList.toggle("hide", y > lastY && y > 160);
      lastY = y;
    };
    addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });

    return () => {
      removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className="nav" ref={ref}>
      <a href="#top" className="logo" aria-label={t.backToTop}>{initials}</a>
      <div className="nav-right">
        <nav className="nav-links">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : undefined}>{t.nav[id]}</a>
          ))}
        </nav>
        <button
          type="button"
          className="lang"
          data-lang={lang}
          aria-label={t.switchTo}
          onClick={() => switchLang(lang === "mn" ? "en" : "mn")}
        >
          <i aria-hidden="true" />
          <span className={lang === "mn" ? "on" : undefined}>MN</span>
          <span className={lang === "en" ? "on" : undefined}>EN</span>
        </button>
      </div>
    </header>
  );
}
