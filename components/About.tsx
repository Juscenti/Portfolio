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
          <span className="sl-num">ABOUT</span>
          <div className="sl-title">Who I am.</div>
          <div className="sl-rule"></div>
        </div>

        {/* Bio + photo carousel side by side */}
        <div className="about-content-row r rd1">
          <div className="about-bio">
            I&apos;m a software engineer from Kingston, studying Computing at UTech.
            Most of my time this year has gone into Cite, the campus map I co-founded.
            It started because the stuff you actually need to know on campus,
            like whether the bathroom on your floor is locked or how long the
            canteen line is, never makes it onto Google Maps. We shipped 1.0 to
            the App Store in September 2026 and have kept updating it since.
            Outside of that I draw, write, and I&apos;m slowly learning Japanese.
          </div>

          {/* Image carousel — tap left/right to navigate */}
          <ImageCarousel images={portraitImages} />
        </div>

        {/* Currently grid */}
        <div className="currently-grid r rd2">
          <div className="c-item">
            <span className="c-key"><span>[</span>shipped<span>]</span></span>
            <span className="c-val"><b>Cite</b>, live campus map, on the App Store</span>
          </div>
          <div className="c-item">
            <span className="c-key"><span>[</span>learning<span>]</span></span>
            <span className="c-val">system design and distributed systems</span>
          </div>
          <div className="c-item">
            <span className="c-key"><span>[</span>studying<span>]</span></span>
            <span className="c-val">日本語, slowly</span>
          </div>
          <div className="c-item">
            <span className="c-key"><span>[</span>starting<span>]</span></span>
            <span className="c-val"><b>Lavitur</b>, my clothing brand</span>
          </div>
          <div className="c-item">
            <span className="c-key"><span>[</span>writing<span>]</span></span>
            <span className="c-val">short pieces, mostly for myself</span>
          </div>
          <div className="c-item">
            <span className="c-key"><span>[</span>drawing<span>]</span></span>
            <span className="c-val">sketchbooks, characters, whatever&apos;s around</span>
          </div>
        </div>

        {/* Interests */}
        <div className="interests-row r rd3">
          <div className="int-item">
            <div className="int-icon">// art</div>
            <div className="int-name">Visual Art</div>
            <div className="int-desc">
              I took Visual Arts for CXC and never stopped. It&apos;s why I end up caring about how the apps I work on look, not just whether they run.
            </div>
          </div>
          <div className="int-item">
            <div className="int-icon">// write</div>
            <div className="int-name">Writing</div>
            <div className="int-desc">
              Mostly notes and short pieces. Writing out an idea is usually how I find out I don&apos;t understand it yet.
            </div>
          </div>
          <div className="int-item">
            <div className="int-icon">// 日本語</div>
            <div className="int-name">Japanese</div>
            <div className="int-desc">
              Learning it on the side. Slow going, but I like it.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
