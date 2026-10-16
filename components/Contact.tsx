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
              <span>~/</span>contact
            </span>
            <div className="sh-rule"></div>
          </div>
          <div className="section-title">Contact</div>
        </div>

        <div className="contact-block r rd1">
          <div className="cb-header">
            <span>kuaneforrest@gmail.com</span>
            <span style={{ color: "var(--accent)" }}>● open to work</span>
          </div>
          <div className="cb-body">
            <div className="contact-title">
              Say
              <br />
              <span>hello.</span>
            </div>
            <p className="contact-sub">
              I&apos;m open to software roles and collaborations, and always happy to
              talk about Cite. Email is the fastest way to reach me.
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
                <div className="ci-key">[cite]</div>
                <div className="ci-val">
                  <a href="https://joincite.com" target="_blank" rel="noreferrer">
                    joincite.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-key">[location]</div>
                <div className="ci-val" style={{ color: "var(--muted)" }}>
                  Kingston, Jamaica
                </div>
              </div>
            </div>
            <div className="contact-ctas">
              <a href="mailto:kuaneforrest@gmail.com" className="btn btn-accent">
                email me
              </a>
              <a
                href="https://www.linkedin.com/in/kuane-forrest-2996012b3/"
                target="_blank"
                rel="noreferrer"
                className="btn"
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
              <a href="/Kuane_Forrest_CV.txt" download="Kuane_Forrest_CV.txt" className="btn">
                download cv
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
