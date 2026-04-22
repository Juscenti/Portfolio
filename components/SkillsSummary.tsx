"use client";

import { useEffect, useRef } from "react";

const summarySkills = [
  { name: "TypeScript", primary: true },
  { name: "JavaScript", primary: true },
  { name: "React Native", primary: true },
  { name: "Next.js", primary: true },
  { name: "PostgreSQL", primary: true },
  { name: "System Design", primary: true },
];

export default function SkillsSummary() {
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
    <section id="skills-summary" ref={sectionRef}>
      <div className="wrap">
        <div className="section-label r">
          <span className="sl-num">SKILLS — OVERVIEW</span>
          <div className="sl-title">What I build with.</div>
          <div className="sl-rule"></div>
        </div>

        <div className="skills-summary r rd1">
          {summarySkills.map((skill) => (
            <span
              key={skill.name}
              className={`skill-chip ${skill.primary ? "primary" : ""}`}
            >
              {skill.name}
            </span>
          ))}
        </div>

        <p className="skills-note r">
          See the <strong>skills</strong> tab for the complete list and detailed breakdown.
        </p>
      </div>
    </section>
  );
}
