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
          <span className="sl-num">EXPERIENCE</span>
          <div className="sl-title">What I&apos;ve worked on.</div>
          <div className="sl-rule"></div>
        </div>

        <div className="exp-education r rd1">
          <div className="edu-item">
            <div className="edu-header">
              <div className="edu-school">Cite</div>
              <div className="edu-degree">Co-founder · 2026 to now · Kingston</div>
            </div>
            <div className="edu-coursework">
              <span className="edu-label">What it is</span>
              <p className="exp-role-desc">
                A live map of UTech, UWI Mona and Kingston, updated by the people who are there.
                Pins, reports that expire on their own, area alerts and events, on iOS.
                We took it from first commit in March to 1.0 on the App Store in September, and
                to 1.8 three weeks later.
              </p>
              <div className="edu-courses">
                <span>React Native and Expo</span>
                <span>Supabase and PostgreSQL</span>
                <span>App Store releases</span>
                <span>joincite.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="section-label r" style={{ marginTop: "3rem" }}>
          <span className="sl-num">EDUCATION</span>
          <div className="sl-title">School.</div>
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
                <span>English Language: Grade 2</span>
                <span>Mathematics: Grade 1</span>
                <span>Visual Arts: Grade 2</span>
                <span>Information Technology: Grade 2</span>
                <span>English Literature: Grade 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Focus */}
        <div className="section-label r" style={{ marginTop: "3rem" }}>
          <span className="sl-num">CURRENT FOCUS</span>
          <div className="sl-title">What I&apos;m on right now.</div>
          <div className="sl-rule"></div>
        </div>

        <div className="exp-focus r rd1">
          <div className="focus-item">
            <span className="focus-status">Shipping</span>
            <span className="focus-desc">Cite updates on the App Store</span>
          </div>
          <div className="focus-item">
            <span className="focus-status">Building</span>
            <span className="focus-desc">LiveLine, a mobile app for event logistics</span>
          </div>
          <div className="focus-item">
            <span className="focus-status">Starting</span>
            <span className="focus-desc">Lavitur, my clothing brand</span>
          </div>
          <div className="focus-item">
            <span className="focus-status">Learning</span>
            <span className="focus-desc">Distributed systems, and Japanese</span>
          </div>
        </div>
      </div>
    </section>
  );
}
