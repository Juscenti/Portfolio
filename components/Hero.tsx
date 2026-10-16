"use client";

import { useEffect, useState } from "react";

const APP_STORE = "https://apps.apple.com/us/app/cite-community-mapping/id6807413740";

const CHARS ="KUANEFORSTJuscenti0123456789!@#$%^*~><{}[]|";

const rnd = () => CHARS[Math.floor(Math.random() * CHARS.length)];
const makeNoise = (len: number) => Array.from({ length: len }, rnd).join("");
const scrambleTarget = (target: string, revealed: number) =>
  target.split("").map((ch, i) => (ch === " " ? " " : i < revealed ? ch : rnd())).join("");

export default function Hero({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [display, setDisplay] = useState("");
  const [revealedCount, setRevealedCount] = useState(0);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("#hero .r").forEach((el) =>
      el.classList.add("v")
    );
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Flicker scramble at `len` chars for `ticks` ticks, then call onDone
    function flicker(len: number, ticks: number, intervalMs: number, onDone: () => void) {
      let count = 0;
      const id = setInterval(() => {
        if (cancelled) { clearInterval(id); return; }
        setDisplay(makeNoise(len));
        setRevealedCount(0);
        if (++count >= ticks) { clearInterval(id); onDone(); }
      }, 10);
    }

    // Shrink display from `from` chars down to `to` chars (trims right side)
    function collapse(from: number, to: number, onDone: () => void) {
      let len = from;
      const id = setInterval(() => {
        if (cancelled) { clearInterval(id); return; }
        setDisplay(makeNoise(--len));
        if (len <= to) { clearInterval(id); onDone(); }
      }, 10);
    }

    // Reveal target left-to-right
    function reveal(target: string, onDone: () => void) {
      let revealed = 0;
      setRevealedCount(0);
      setDisplay(scrambleTarget(target, 0));
      const id = setInterval(() => {
        if (cancelled) { clearInterval(id); return; }
        revealed++;
        setRevealedCount(revealed);
        setDisplay(scrambleTarget(target, revealed));
        if (revealed >= target.length) {
          clearInterval(id);
          setDisplay(target);
          onDone();
        }
      }, 30);
    }

    // Frantic "wait that's wrong" scramble reaction
    function panic(len: number, onDone: () => void) {
      let count = 0;
      setRevealedCount(0);
      const id = setInterval(() => {
        if (cancelled) { clearInterval(id); return; }
        setDisplay(makeNoise(len));
        if (++count >= 14) { clearInterval(id); onDone(); }
      }, 12);
    }

    // ── THE SEQUENCE ──────────────────────────────────────────────
    setDisplay(makeNoise(13));

    // [1] Big dramatic scramble: 13 chars flickering — looks important
    flicker(13, 20, 30, () => { if (cancelled) return;

    // [2] Collapses down to 5 chars — building suspense
    collapse(13, 5, () => { if (cancelled) return;

    // [3] Decodes confidently to "Centi" — proud of itself
    reveal("Centi", () => { if (cancelled) return;

    // [4] Hold it... you can almost hear it processing
    setTimeout(() => { if (cancelled) return;

    // [5] OH WAIT — panics, that's wrong
    panic(5, () => { if (cancelled) return;

    // [6] Second attempt: "Juscenti" — more letters, surely correct
    reveal("Juscenti", () => { if (cancelled) return;

    // [7] Hold... overconfident
    setTimeout(() => { if (cancelled) return;

    // [8] STILL WRONG — full chaos
    panic(8, () => { if (cancelled) return;

    // [9] The real one. Finally.
    reveal("Kuane Forrest", () => {
      if (!cancelled) setAnimDone(true);
    });
    }); }, 550);
    }); }); }, 500);
    }); }); });

    return () => { cancelled = true; };
  }, []);

  return (
    <section id="hero">
      <div className="hero-wrap">

        <h1 className="name r">
          <span style={{ display: "inline-block", whiteSpace: "pre" }}>
            {display.split("").map((char, i) => (
              <span
                key={i}
                className={i < revealedCount || animDone ? "name-revealed" : "name-encrypted"}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-sub r rd1">
          Software engineer from Kingston, Jamaica. I mostly build mobile apps
          in React Native, along with the databases and APIs behind them.
          Outside of code I draw, write, and I&apos;m starting a clothing brand.
        </p>

        <div className="hero-cta r rd2">
          <button onClick={() => onNavigate?.("projects")} className="btn btn-accent">view work</button>
          <a href="/Kuane_Forrest_CV.txt" download="Kuane_Forrest_CV.txt" className="btn">download cv</a>
          <a href="https://github.com/Juscenti" target="_blank" rel="noreferrer" className="btn">github</a>
          <a href="https://www.linkedin.com/in/kuane-forrest-2996012b3/" target="_blank" rel="noreferrer" className="btn">linkedin</a>
        </div>

        <dl className="hero-now r rd3">
          <div className="hn-row">
            <dt>now</dt>
            <dd>
              Co-founder of{" "}
              <a href={APP_STORE} target="_blank" rel="noreferrer" className="hn-cite">
                <img src="/images/cite-icon.png" alt="" />Cite
              </a>
              , a live campus map, on the App Store since September 2026
            </dd>
          </div>
          <div className="hn-row">
            <dt>studying</dt>
            <dd>Computing at the University of Technology, Jamaica</dd>
          </div>
          <div className="hn-row">
            <dt>also</dt>
            <dd>LiveLine, and the first Lavitur collection</dd>
          </div>
        </dl>

      </div>
    </section>
  );
}
