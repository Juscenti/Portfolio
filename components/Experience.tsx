"use client";

import { useEffect, useRef } from "react";

export default function Experience() {
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
    <section id="experience" ref={sectionRef}>
      <div className="wrap">
        {/* Background Statement */}
        <div className="section-label r">
          <span className="sl-num">BACKGROUND</span>
          <div className="sl-title">Who I am & where I'm headed.</div>
          <div className="sl-rule"></div>
        </div>

        <div className="exp-statement r rd1">
          <p>
            Detail-oriented software engineer with hands-on experience in full-stack development
            and technical problem-solving. Demonstrates strong analytical thinking and commitment
            to building scalable, high-performance solutions. Precision-focused on clean code,
            structured systems, and building things that last.
          </p>
        </div>

        {/* Education */}
        <div className="section-label r" style={{ marginTop: "3rem" }}>
          <span className="sl-num">EDUCATION</span>
          <div className="sl-title">Foundations & learning.</div>
          <div className="sl-rule"></div>
        </div>

        <div className="exp-education r rd1">
          <div className="edu-item">
            <div className="edu-header">
              <div className="edu-school">University of Technology Jamaica</div>
              <div className="edu-degree">Bachelor of Science in Computing</div>
            </div>
            <div className="edu-coursework">
              <span className="edu-label">Relevant Coursework</span>
              <div className="edu-courses">
                <span>Programming Fundamentals</span>
                <span>Data Structures</span>
                <span>Computer Systems</span>
                <span>Web Development</span>
                <span>System Design Concepts</span>
              </div>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-header">
              <div className="edu-school">Mona High School</div>
              <div className="edu-degree">Caribbean Examinations Council (CXC)</div>
            </div>
            <div className="edu-passes">
              <span className="edu-label">Passes</span>
              <div className="edu-grades">
                <span>English Language — Grade 2</span>
                <span>Mathematics — Grade 1</span>
                <span>Visual Arts — Grade 2</span>
                <span>Information Technology — Grade 2</span>
                <span>English Literature — Grade 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Focus */}
        <div className="section-label r" style={{ marginTop: "3rem" }}>
          <span className="sl-num">CURRENT FOCUS</span>
          <div className="sl-title">What I'm working on.</div>
          <div className="sl-rule"></div>
        </div>

        <div className="exp-focus r rd1">
          <div className="focus-item">
            <span className="focus-status">Building</span>
            <span className="focus-desc">Traverse — AI-powered civic intelligence platform</span>
          </div>
          <div className="focus-item">
            <span className="focus-status">Developing</span>
            <span className="focus-desc">LiveLine — Full-stack mobile application</span>
          </div>
          <div className="focus-item">
            <span className="focus-status">Creating</span>
            <span className="focus-desc">Lavitur — Precision streetwear brand</span>
          </div>
          <div className="focus-item">
            <span className="focus-status">Learning</span>
            <span className="focus-desc">Distributed systems, advanced architecture, Japanese language</span>
          </div>
        </div>
      </div>
    </section>
  );
}
