"use client";

import { useEffect, useState } from "react";

const CHARS = "KUANEFORSTJuscenti0123456789!@#$%^*~><{}[]|";

const rnd = () => CHARS[Math.floor(Math.random() * CHARS.length)];
const makeNoise = (len: number) => Array.from({ length: len }, rnd).join("");
const scrambleTarget = (target: string, revealed: number) =>
  target.split("").map((ch, i) => (ch === " " ? " " : i < revealed ? ch : rnd())).join("");

export default function Hero() {
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

        <div className="prompt-block r">
          <div className="prompt-line">
            <span className="pl-ps">kuane@portfolio:~$</span>
            <span className="pl-cmd">describe --no-fluff</span>
          </div>
          <div className="prompt-line">
            <span className="pl-out">&gt; name: kuane forrest</span>
          </div>
          <div className="prompt-line">
            <span className="pl-out">&gt; location: kingston, jamaica</span>
          </div>
          <div className="prompt-line">
            <span className="pl-out">&gt; note: builds things that last</span>
          </div>
          <div className="prompt-line">
            <span className="pl-ps">kuane@portfolio:~$</span>
            <span className="pl-cmd blink">_</span>
          </div>
        </div>

        <h1 className="name r rd1">
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

        <p className="hero-sub r rd2">
          Software engineer out of Kingston, Jamaica.<br />
          I care less about moving fast and more about<br />
          building something you don&apos;t have to rebuild.
        </p>

        <div className="hero-cta r rd3">
          <a href="#projects" className="btn btn-accent">view work</a>
          <a href="/Kuane_Forrest_CV.txt" download="Kuane_Forrest_CV.txt" className="btn">download cv</a>
          <a href="https://github.com/Juscenti" target="_blank" rel="noreferrer" className="btn">github</a>
          <a href="https://www.linkedin.com/in/kuane-forrest-2996012b3/" target="_blank" rel="noreferrer" className="btn">linkedin</a>
        </div>

        <div className="hero-bottom r rd4">
          <div className="hero-stat">
            <div className="hs-n">4</div>
            <div className="hs-l">projects</div>
          </div>
          <div className="hero-stat-div"></div>
          <div className="hero-stat">
            <div className="hs-n">7</div>
            <div className="hs-l">languages</div>
          </div>
          <div className="hero-stat-div"></div>
          <div className="hero-stat">
            <div className="hs-n">1</div>
            <div className="hs-l">brand</div>
          </div>
        </div>

      </div>
    </section>
  );
}
