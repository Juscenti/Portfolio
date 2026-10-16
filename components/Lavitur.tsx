"use client";

import { useEffect, useRef } from "react";

export default function Lavitur() {
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
    <section id="lavitur" ref={sectionRef}>
      <div className="wrap">
        {/* Construction scaffold visual element */}
        <div className="lav-scaffold"></div>

        {/* No standard section header — the block IS the anchor */}
        <div className="lavitur-block r rd1 lav-construction">
          <div className="lav-top">
            <span>~/lavitur $ status</span>
            <span style={{ color: "var(--accent)" }} className="lav-pulse">
              ◌ building
            </span>
          </div>

          {/* Construction corner indicators */}
          <div className="lav-corner lav-corner-tl"></div>
          <div className="lav-corner lav-corner-tr"></div>
          <div className="lav-corner lav-corner-bl"></div>
          <div className="lav-corner lav-corner-br"></div>

          <div className="lav-body">
            <div>
              <div className="lav-tag">my clothing brand</div>
              <div className="lav-name">
                Lavi<em>tur</em>
              </div>
              <p className="lav-desc">
                Lavitur is the brand I&apos;m starting on the side: streetwear cuts, made with
                the kind of fabric and finishing you&apos;d expect from a luxury label.<br /><br />
                I&apos;m working on the first collection now, and building the site for it
                myself.
              </p>
            </div>
            <div className="lav-right">
              <div className="lav-stat-row">
                <div className="lav-stat">
                  <div className="lav-stat-n">1st</div>
                  <div className="lav-stat-l">collection in progress</div>
                </div>
                <div className="lav-stat">
                  <div className="lav-stat-n">TBA</div>
                  <div className="lav-stat-l">launch date</div>
                </div>
              </div>
              <div className="lav-site-box">
                <div className="lav-site-header">lavitur.com</div>
                <div className="lav-site-status">
                  <span className="status-bar"></span>
                  <span className="status-label">Under construction</span>
                </div>
                <p>The site goes up with the first drop.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
