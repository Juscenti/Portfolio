"use client";

import { useEffect } from "react";

export default function CursorAura() {
  useEffect(() => {
    const cur = document.getElementById("cur");
    const cr = document.getElementById("cur-r");
    if (!cur || !cr) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + "px";
      cur.style.top = my + "px";
    };

    const loop = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      cr.style.left = rx + "px";
      cr.style.top = ry + "px";
      rafId = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(loop);

    const addHover = () => document.body.classList.add("ch");
    const removeHover = () => document.body.classList.remove("ch");

    const attachHover = () => {
      document
        .querySelectorAll("a,button,.project-card,.c-item,.int-item,.skill-row,.contact-item,.lav-stat")
        .forEach((el) => {
          el.addEventListener("mouseenter", addHover);
          el.addEventListener("mouseleave", removeHover);
        });
    };

    attachHover();

    const onScroll = () => {
      const nav = document.getElementById("nav");
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
