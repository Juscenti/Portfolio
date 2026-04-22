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
              <div className="lav-tag">clothing brand // 04</div>
              <div className="lav-name">
                Lavi<em>tur</em>
              </div>
              <p className="lav-desc">
                Most brands pick a side. Lavitur doesn&apos;t.<br /><br />
                Streetwear built to the precision of luxury — or luxury stripped down to the
                density of streetwear. It&apos;s the same thesis applied to fabric the way it
                gets applied to code: no compromises, no shortcuts, no half-finished execution.<br /><br />
                The first collection is being made. It will be ready when it&apos;s right.
              </p>
            </div>
            <div className="lav-right">
              <div className="lav-stat-row">
                <div className="lav-stat">
                  <div className="lav-stat-n">01</div>
                  <div className="lav-stat-l">founder</div>
                </div>
                <div className="lav-stat">
                  <div className="lav-stat-n">∞</div>
                  <div className="lav-stat-l">vision</div>
                </div>
                <div className="lav-stat">
                  <div className="lav-stat-n">—</div>
                  <div className="lav-stat-l">launch TBD</div>
                </div>
              </div>
              <div className="lav-site-box">
                <div className="lav-site-header">lavitur.com</div>
                <div className="lav-site-status">
                  <span className="status-bar"></span>
                  <span className="status-label">Under Construction</span>
                </div>
                <p>The site will exist when it deserves to. Not before.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
