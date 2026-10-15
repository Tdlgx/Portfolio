import { useSyncExternalStore } from "react";
import { profile, type Lang } from "@/data/profile";
import { prefersReducedMotion } from "@/lib/motion";

const KEY = "portfolio-lang";
const DEFAULT = profile.defaultLang;
const listeners = new Set<() => void>();
let current: Lang | null = null;

const isLang = (v: unknown): v is Lang => v === "mn" || v === "en";

function getSnapshot(): Lang {
  if (current === null) {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    current = isLang(saved) ? saved : DEFAULT;
  }
  return current;
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

/** Current language. The server always renders the default; the saved choice applies after hydration. */
export const useLang = () => useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT);

function setLang(next: Lang) {
  current = next;
  try { localStorage.setItem(KEY, next); } catch {}
  listeners.forEach((fn) => fn());
}

/** Switch language behind a short blur-out so the text swap isn't a hard cut. */
export function switchLang(next: Lang) {
  if (next === getSnapshot()) return;
  if (prefersReducedMotion()) { setLang(next); return; }
  const body = document.body;
  body.classList.add("lang-swap");
  setTimeout(() => {
    setLang(next);
    requestAnimationFrame(() => requestAnimationFrame(() => body.classList.remove("lang-swap")));
  }, 280);
}

/** Interface text that isn't part of the profile. */
export const ui = {
  mn: {
    title: "Портфолио",
    nav: { about: "Тухай", work: "Төслүүд", experience: "Туршлага", contact: "Холбоо барих" },
    seeWork: "Миний Төслүүд",
    getInTouch: "Холбогдох",
    localTime: "Одоогийн цаг",
    locationPrefix: " · ",
    about: "Миний тухай",
    work: "Сонгосон төслүүд",
    experience: "Ажлын туршлага",
    contact: "Холбоо барих",
    backToTop: "Дээш буцах",
    addPhoto: "public/profile.jpg зургаа нэмнэ үү",
    switchTo: "Switch to English",
  },
  en: {
    title: "Portfolio",
    nav: { about: "About", work: "Work", experience: "Experience", contact: "Contact" },
    seeWork: "See my work",
    getInTouch: "Get in touch",
    localTime: "Local time",
    locationPrefix: " in ",
    about: "About",
    work: "Selected work",
    experience: "Experience",
    contact: "Contact",
    backToTop: "Back to top",
    addPhoto: "Add public/profile.jpg",
    switchTo: "Монгол хэл рүү шилжих",
  },
} satisfies Record<Lang, unknown>;
