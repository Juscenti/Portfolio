"use client";

import { useEffect, useRef, useState } from "react";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mtrack, setMtrack] = useState("—");
  const [martist, setMartist] = useState("");
  const [mstatus, setMstatus] = useState("connecting...");
  const [playing, setPlaying] = useState(false);

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

    // Last.fm placeholder — configure separately
    setMstatus("last listening");
    setMtrack("Set up Last.fm to enable");
    setMartist("Add API key & username in the code");
    setPlaying(false);

    return () => ro.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="wrap">

        {/* Terminal-style header — fits "ls projects" */}
        <div className="section-header r">
          <div className="sh-line">
            <span className="sh-cmd"><span>~$</span> ls -la projects/</span>
            <div className="sh-rule"></div>
          </div>
          <div className="section-title">
            Selected Work <span className="dim">// 03</span>
          </div>
        </div>

        {/*
          Grid layout communicates scope visually:
          001 Traverse — full width, featured (most impactful project)
          002 WordHunter + 003 LiveLine — side by side
          004 Lavitur site — full width, quieter (has its own section)
        */}
        <div className="projects-layout r rd1">

          {/* 001 — Traverse: full-width featured */}
          <div className="p-full">
            <div className="project-card pc-featured">
              <div className="pc-header">
                <div className="pc-top-row">
                  <span className="pc-num">001</span>
                  <div className="pc-meta">
                    <span className="pc-status s-live">● live</span>
                    <div className="pc-links">
                      <a href="https://github.com/kyim50/scoutz" target="_blank" rel="noreferrer" className="pc-link">github</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="pc-title">Traverse</div>
                  <div className="pc-desc">
                    Community-powered, AI-assisted civic intelligence map. Users submit real-time
                    field reports; AI groups and surfaces patterns over noise. Built for campuses,
                    cities, and eventually everywhere.
                  </div>
                </div>
              </div>
              <div className="pc-tags">
                <span className="tag">AI</span>
                <span className="tag">Maps</span>
                <span className="tag">Real-Time</span>
                <span className="tag">Civic Tech</span>
              </div>
            </div>
          </div>

          {/* 002 — WordHunter: half */}
          <div className="p-half">
            <div className="project-card">
              <div className="pc-header">
                <div className="pc-top-row">
                  <span className="pc-num">002</span>
                  <div className="pc-meta">
                    <span className="pc-status s-live">● live</span>
                    <div className="pc-links">
                      <a href="https://word-hunter-jade.vercel.app/" target="_blank" rel="noreferrer" className="pc-link">live site</a>
                      <a href="https://github.com/Juscenti/WordHunter" target="_blank" rel="noreferrer" className="pc-link">github</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="pc-title">WordHunter</div>
                  <div className="pc-desc">
                    Advanced Word Hunt puzzle solver built for precision and speed. Finds all valid
                    words across multiple board types with real-time visualization. Configurable
                    rules, intelligent pathfinding, and instant results ranked by score.
                  </div>
                </div>
              </div>
              <div className="pc-tags">
                <span className="tag">JavaScript</span>
                <span className="tag">Algorithm</span>
                <span className="tag">Pathfinding</span>
                <span className="tag">Vercel</span>
              </div>
            </div>
          </div>

          {/* 003 — LiveLine: half */}
          <div className="p-half">
            <div className="project-card">
              <div className="pc-header">
                <div className="pc-top-row">
                  <span className="pc-num">003</span>
                  <div className="pc-meta">
                    <span className="pc-status s-wip">◌ in progress</span>
                    <div className="pc-links">
                      <a href="https://github.com/Juscenti/LiveLine" target="_blank" rel="noreferrer" className="pc-link">github</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="pc-title">LiveLine</div>
                  <div className="pc-desc">
                    Full-stack mobile application. TypeScript frontend built with React Native and
                    Expo, backed by a PostgreSQL database. Clean separation of concerns across app,
                    backend, and database layers.
                  </div>
                </div>
              </div>
              <div className="pc-tags">
                <span className="tag">TypeScript</span>
                <span className="tag">React Native</span>
                <span className="tag">Expo</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">Full-Stack</span>
                <span className="tag">Mobile</span>
              </div>
            </div>
          </div>

          {/* 004 — Lavitur site: full-width, quiet */}
          <div className="p-full pc-quiet">
            <div className="project-card">
              <div className="pc-header">
                <div className="pc-top-row">
                  <span className="pc-num">004</span>
                  <div className="pc-meta">
                    <span className="pc-status s-wip">◌ in progress</span>
                    <div className="pc-links">
                      <a href="https://github.com/Juscenti/lavitur" target="_blank" rel="noreferrer" className="pc-link">github</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="pc-title">
                    Lavitur{" "}
                    <span style={{ color: "var(--muted)", fontSize: ".72rem", fontWeight: 400 }}>
                      // the brand site
                    </span>
                  </div>
                  <div className="pc-desc">
                    Official web presence for Lavitur. Designed and built from scratch to match the
                    brand: streetwear precision with luxury finish.
                  </div>
                </div>
              </div>
              <div className="pc-tags">
                <span className="tag">Web</span>
                <span className="tag">Brand</span>
                <span className="tag">E-Commerce</span>
                <span className="tag">Design</span>
              </div>
            </div>
          </div>

        </div>

        {/* Last.fm music block — untouched */}
        <div className="music-block r" style={{ marginTop: "2rem" }}>
          <div className="music-l">
            <div className="music-status">
              <span className="live-dot"></span>
              <span>{mstatus}</span>
            </div>
            <div className="music-name">{mtrack}</div>
            <div className="music-art">{martist}</div>
          </div>
          <div className={`music-bars${playing ? "" : " bars-off"}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
