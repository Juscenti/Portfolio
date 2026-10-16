"use client";

import { useEffect, useRef } from "react";

// Faint dot grid behind the whole site. Every so often one dot lights up in the
// accent colour and fades out again, like a report posted on Cite that expires.

const GAP = 28;          // px between dots
const LIFE = 4200;       // ms a pulse stays visible
const EVERY = 1100;      // ms between new pulses
const MAX_PULSES = 6;

type Pulse = { x: number; y: number; born: number };

export default function MapGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const grid = document.createElement("canvas");
    let w = 0, h = 0, dpr = 1;
    let dotColor = "", accent = "";
    let pulses: Pulse[] = [];
    let lastSpawn = 0;
    let raf = 0;

    const readColors = () => {
      const s = getComputedStyle(document.body);
      dotColor = s.getPropertyValue("--border2").trim() || "#383838";
      accent = s.getPropertyValue("--accent").trim() || "#c8ff00";
    };

    // The grid itself never changes, so draw it once per resize and blit it.
    const drawGrid = () => {
      grid.width = canvas.width;
      grid.height = canvas.height;
      const g = grid.getContext("2d")!;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = dotColor;
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          g.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
        }
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      drawGrid();
      render(performance.now());
    };

    const spawn = (now: number) => {
      const cols = Math.floor(w / GAP);
      const rows = Math.floor(h / GAP);
      pulses.push({
        x: GAP / 2 + Math.floor(Math.random() * cols) * GAP,
        y: GAP / 2 + Math.floor(Math.random() * rows) * GAP,
        born: now,
      });
    };

    const render = (now: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(grid, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (const p of pulses) {
        const t = (now - p.born) / LIFE;          // 0 → 1
        // quick rise, slow fade
        const a = t < 0.12 ? t / 0.12 : 1 - (t - 0.12) / 0.88;
        ctx.globalAlpha = Math.max(0, a) * 0.8;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // one ring that spreads out over the first part of its life
        if (t < 0.6) {
          ctx.globalAlpha = (1 - t / 0.6) * 0.4;
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 + t * 40, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      pulses = pulses.filter((p) => now - p.born < LIFE);
      if (now - lastSpawn > EVERY && pulses.length < MAX_PULSES) {
        spawn(now);
        lastSpawn = now + Math.random() * 600;   // a little irregular
      }
      render(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (!reduceMotion && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());

    // Light/dark is a data-theme attribute on <body>; redraw in the new colours.
    const themeWatch = new MutationObserver(() => {
      readColors();
      drawGrid();
      render(performance.now());
    });

    readColors();
    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    themeWatch.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeWatch.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="map-grid" aria-hidden="true" />;
}
