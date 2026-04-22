"use client";

import { useEffect, useRef } from "react";

export default function Editorial() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ro = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("v");
        }),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll<HTMLElement>(".r").forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, []);

  return (
    <div className="editorial-break" ref={ref}>
      <div className="wrap">
        <div className="editorial-statement r">
          Build it right,
          <br />
          <em>or build it again.</em>
        </div>
        <div className="editorial-attr r rd1">
          — the standard applied to everything on this page
        </div>
      </div>
    </div>
  );
}
