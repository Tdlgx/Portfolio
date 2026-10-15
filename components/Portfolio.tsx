"use client";

import { useEffect, type CSSProperties } from "react";
import { profile } from "@/data/profile";
import { ui, useLang } from "@/lib/lang";
import HeroName from "@/components/HeroName";
import RoleScramble from "@/components/RoleScramble";
import Moon from "@/components/Moon";
import Clock, { Year } from "@/components/Clock";
import Parallax from "@/components/Parallax";
import AboutText from "@/components/AboutText";

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

const external = (url?: string) => (url ? { href: url, target: "_blank", rel: "noopener" } : null);

/** All page content, in the currently selected language. */
export default function Portfolio() {
  const lang = useLang();
  const t = ui[lang];
  const c = profile.content[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${c.name} — ${t.title}`;
  }, [lang, c.name, t.title]);

  return (
    <>
      <main id="top">
        <section className="hero">
          <Parallax speed={0.18} fade>
            <HeroName key={lang} name={c.name} />
            <p className="hero-role fade" style={delay("1.3s")}>
              <RoleScramble roles={c.roles} />
              <span className="where">{t.locationPrefix}{c.location}</span>
            </p>
            <p className="hero-intro fade" style={delay("1.45s")}>{c.intro}</p>
            <div className="hero-cta fade" style={delay("1.6s")}>
              <a href="#work" className="btn primary">{t.seeWork}</a>
              <a href="#contact" className="btn">{t.getInTouch}</a>
            </div>
          </Parallax>

          <Parallax speed={0.08} className="hero-moon">
            <Moon photo={profile.photo} name={c.name} emptyLabel={t.addPhoto} />
          </Parallax>

          <div className="hero-foot fade" style={delay("1.9s")}>
            <span>{t.localTime} <Clock timezone={profile.timezone} /></span>
            <span className="status"><i />{c.status}</span>
          </div>
        </section>

        <section className="section" id="about">
          <h2>{t.about}</h2>
          <div>
            <AboutText text={c.about} />
            <ul className="skills">
              {c.skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </section>

        <section className="section" id="work">
          <h2>{t.work}</h2>
          <ul className="rows">
            {c.projects.map((p, i) => (
              <li key={i}>
                <a className="project" href="#work" {...external(p.link)}>
                  <span>
                    <span className="p-title">{p.title}</span>
                    <span className="p-desc">{p.description}</span>
                  </span>
                  <span className="p-meta">{p.meta}<br />{p.year}</span>
                  <Arrow className="p-arrow" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="experience">
          <h2>{t.experience}</h2>
          <ul className="rows">
            {c.experience.map((x, i) => (
              <li className="exp" key={i}>
                <div className="exp-period">{x.period}</div>
                <div className="exp-role">
                  {x.role}
                  <span className="exp-company">{x.company}</span>
                </div>
                <p className="exp-desc">{x.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section contact" id="contact">
          <h2>{t.contact}</h2>
          <div>
            <p className="contact-lead">{c.contactLead}</p>
            <a className="email" href={`mailto:${profile.email}`}>{profile.email}</a>
            <ul className="socials">
              {profile.socials.map((s, i) => (
                <li key={i}>
                  <a href="#contact" {...external(s.url)}>{s.label}<Arrow /></a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer>
        <span>© <Year /> {c.name}</span>
        <a href="#top">{t.backToTop}</a>
      </footer>
    </>
  );
}
