"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ro = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("v");
        }),
      { threshold: 0.08 }
    );
    sectionRef.current
      ?.querySelectorAll<HTMLElement>(".r")
      .forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef}>
      <div className="wrap">
        <div className="section-header r">
          <div className="sh-line">
            <span className="sh-cmd">
              <span>~$</span> ping kuane --say-hello
            </span>
            <div className="sh-rule"></div>
          </div>
          <div className="section-title">
            Contact <span className="dim">// 05</span>
          </div>
        </div>

        <div className="contact-block r rd1">
          <div className="cb-header">
            <span>~/contact $ ls -la</span>
            <span style={{ color: "var(--accent)" }}>● online — response &lt;24h</span>
          </div>
          <div className="cb-body">
            <div className="contact-title">
              Let&apos;s
              <br />
              <span>Build.</span>
            </div>
            <p className="contact-sub">
              Open to opportunities, collaborations, and conversations worth having.
            </p>
            <div className="contact-grid">
              <div className="contact-item">
                <div className="ci-key">[github]</div>
                <div className="ci-val">
                  <a href="https://github.com/Juscenti" target="_blank" rel="noreferrer">
                    github.com/Juscenti
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-key">[linkedin]</div>
                <div className="ci-val">
                  <a
                    href="https://www.linkedin.com/in/kuane-forrest-2996012b3/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    in/kuane-forrest
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-key">[location]</div>
                <div className="ci-val" style={{ color: "var(--muted)" }}>
                  Kingston, Jamaica [JA]
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-key">[status]</div>
                <div className="ci-val" style={{ color: "var(--accent)" }}>
                  available for work
                </div>
              </div>
            </div>
            <div className="contact-ctas">
              <a
                href="https://www.linkedin.com/in/kuane-forrest-2996012b3/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent"
              >
                linkedin
              </a>
              <a
                href="https://github.com/Juscenti"
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                github
              </a>
              <a
                href="#"
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Add your CV PDF URL to enable download.");
                }}
              >
                download cv
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
