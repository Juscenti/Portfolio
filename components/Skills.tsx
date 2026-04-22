"use client";

import { useEffect, useRef } from "react";

const categories = [
  {
    label: "Core Languages",
    skills: [
      { name: "TypeScript", primary: true },
      { name: "JavaScript", primary: true },
      { name: "HTML & CSS", primary: true },
      { name: "Python", primary: false },
      { name: "SQL", primary: false },
      { name: "C", primary: false },
    ],
  },
  {
    label: "Frameworks & Mobile",
    skills: [
      { name: "React Native", primary: true },
      { name: "Expo", primary: true },
      { name: "Next.js", primary: false },
    ],
  },
  {
    label: "Data & Databases",
    skills: [
      { name: "PostgreSQL", primary: true },
      { name: "SQL Design", primary: false },
      { name: "Database Architecture", primary: false },
    ],
  },
  {
    label: "Systems & Engineering",
    skills: [
      { name: "System Design", primary: true },
      { name: "Scalable Architecture", primary: true },
      { name: "API Design", primary: false },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ro = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("v");
        }),
      { threshold: 0.06 }
    );
    sectionRef.current
      ?.querySelectorAll<HTMLElement>(".r")
      .forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="wrap">

        {/* Style B header */}
        <div className="section-label r">
          <span className="sl-num">02 — THE STACK</span>
          <div className="sl-title">What I build with.</div>
          <div className="sl-rule"></div>
        </div>

        <div className="skills-grid r rd1">
          {categories.map((cat) => (
            <div className="skill-category" key={cat.label}>
              <div className="skill-cat-label">
                <span className="skill-cat-dot"></span>
                {cat.label}
              </div>
              <div className="skill-chips">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className={`skill-chip${s.primary ? " primary" : ""}`}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
