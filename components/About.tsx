"use client";

import { useEffect, useRef } from "react";
import ImageCarousel from "./ImageCarousel";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // Add your image paths here
  const portraitImages = [
    "/images/portfolio.png",
    "/images/image1.png",
    "/images/image3.png",
    // Add more images as needed
  ];

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
    <section id="about" ref={sectionRef}>
      <div className="wrap">

        {/* Style B header — clean numeric, no terminal command */}
        <div className="section-label r">
          <span className="sl-num">01 — ABOUT</span>
          <div className="sl-title">Who I am.</div>
          <div className="sl-rule"></div>
        </div>

        {/* Bio + photo carousel side by side */}
        <div className="about-content-row r rd1">
          <div className="about-bio">
            A precision-focused software engineer who values clean, structured systems.
            I always aim for scalable, high-performance and fun builds.
            Everything I create is built to a high standard using my full current capabilities.
            Based in Kingston, Jamaica. Building things that last.
          </div>

          {/* Image carousel — tap left/right to navigate */}
          <ImageCarousel images={portraitImages} />
        </div>

        {/* Currently grid */}
        <div className="currently-grid r rd2">
          <div className="c-item">
            <span className="c-key"><span>[</span>building<span>]</span></span>
            <span className="c-val"><b>Traverse</b> — civic AI intelligence map</span>
          </div>
          <div className="c-item">
            <span className="c-key"><span>[</span>learning<span>]</span></span>
            <span className="c-val">system design &amp; distributed architecture</span>
          </div>
          <div className="c-item">
            <span className="c-key"><span>[</span>studying<span>]</span></span>
            <span className="c-val">日本語 — learning Japanese</span>
          </div>
          <div className="c-item">
            <span className="c-key"><span>[</span>creating<span>]</span></span>
            <span className="c-val"><b>Lavitur</b> — streetwear meets luxury</span>
          </div>
          <div className="c-item">
            <span className="c-key"><span>[</span>writing<span>]</span></span>
            <span className="c-val">prose, ideas, structured thought</span>
          </div>
          <div className="c-item">
            <span className="c-key"><span>[</span>making<span>]</span></span>
            <span className="c-val">art — visual expression alongside code</span>
          </div>
        </div>

        {/* Interests */}
        <div className="interests-row r rd3">
          <div className="int-item">
            <div className="int-icon">// art</div>
            <div className="int-name">Visual Art</div>
            <div className="int-desc">
              Visual thinking bleeds into how I build. Structure and aesthetics are the same discipline.
            </div>
          </div>
          <div className="int-item">
            <div className="int-icon">// write</div>
            <div className="int-name">Writing</div>
            <div className="int-desc">
              Clarity in prose mirrors clarity in code. Both demand precision and knowing when to stop.
            </div>
          </div>
          <div className="int-item">
            <div className="int-icon">// 日本語</div>
            <div className="int-name">Japanese</div>
            <div className="int-desc">
              A different system of thought. Learning it rewires how you approach pattern and structure.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
