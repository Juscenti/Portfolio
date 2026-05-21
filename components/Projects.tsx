"use client";

import { useEffect, useRef, useState } from "react";

type ProjectLink = { label: string; href: string };
type Project = {
  num: string;
  title: string;
  titleNote?: string;
  desc: string;
  status: "live" | "wip";
  tags: string[];
  links: ProjectLink[];
  layout: "full" | "half";
  quiet?: boolean;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    num: "001",
    title: "Traverse",
    desc: "Community-powered, AI-assisted civic intelligence map. Users submit real-time field reports; AI groups and surfaces patterns over noise. Built for campuses, cities, and eventually everywhere.",
    status: "live",
    tags: ["AI", "Maps", "Real-Time", "Civic Tech"],
    links: [{ label: "github", href: "https://github.com/kyim50/scoutz" }],
    layout: "full",
    featured: true,
  },
  {
    num: "002",
    title: "WordHunter",
    desc: "Advanced Word Hunt puzzle solver built for precision and speed. Finds all valid words across multiple board types with real-time visualization. Configurable rules, intelligent pathfinding, and instant results ranked by score.",
    status: "live",
    tags: ["JavaScript", "Algorithm", "Pathfinding", "Vercel"],
    links: [
      { label: "live site", href: "https://word-hunter-jade.vercel.app/" },
      { label: "github", href: "https://github.com/Juscenti/WordHunter" },
    ],
    layout: "half",
  },
  {
    num: "003",
    title: "LiveLine",
    desc: "Full-stack mobile application. TypeScript frontend built with React Native and Expo, backed by a PostgreSQL database. Clean separation of concerns across app, backend, and database layers.",
    status: "wip",
    tags: ["TypeScript", "React Native", "Expo", "PostgreSQL", "Full-Stack", "Mobile"],
    links: [{ label: "github", href: "https://github.com/Juscenti/LiveLine" }],
    layout: "half",
  },
  {
    num: "004",
    title: "Lavitur",
    titleNote: "// the brand site",
    desc: "Official web presence for Lavitur. Designed and built from scratch to match the brand: streetwear precision with luxury finish.",
    status: "wip",
    tags: ["Web", "Brand", "E-Commerce", "Design"],
    links: [{ label: "github", href: "https://github.com/Juscenti/lavitur" }],
    layout: "full",
    quiet: true,
  },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % images.length : null));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetch(`/api/screenshots/${encodeURIComponent(project.title)}`)
      .then((r) => r.json())
      .then((data) => { setImages(data.images ?? []); setLoading(false); })
      .catch(() => setLoading(false));
    return () => { document.body.style.overflow = ""; };
  }, [project.title]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === "Escape")     { e.stopImmediatePropagation(); closeLightbox(); }
        if (e.key === "ArrowLeft")  prev();
        if (e.key === "ArrowRight") next();
      } else {
        if (e.key === "Escape") onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightbox, images.length, onClose]);

  return (
    <>
      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lb-overlay" onClick={closeLightbox}>
          <button className="lb-arrow lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
          <div className="lb-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={images[lightbox]} alt={`${project.title} ${lightbox + 1} of ${images.length}`} className="lb-img" />
          </div>
          <button className="lb-arrow lb-next" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
          <div className="lb-counter">{lightbox + 1} / {images.length}</div>
          <button className="lb-close" onClick={closeLightbox}>[×]</button>
        </div>
      )}

      {/* ── Project modal ── */}
      <div className="pm-overlay" onClick={onClose}>
        <div className="pm-panel" onClick={(e) => e.stopPropagation()}>

          <div className="pm-header">
            <div className="pm-hd-left">
              <span className="pc-num">{project.num}</span>
              <span className="pm-title">{project.title}</span>
              {project.titleNote && (
                <span className="pm-title-note">{project.titleNote}</span>
              )}
            </div>
            <div className="pm-hd-right">
              <span className={`pc-status ${project.status === "live" ? "s-live" : "s-wip"}`}>
                {project.status === "live" ? "● live" : "◌ in progress"}
              </span>
              <button className="pm-close" onClick={onClose}>[×] close</button>
            </div>
          </div>

          <div className="pm-desc">{project.desc}</div>

          <div className="pm-section">
            <div className="pm-section-label">~$ ls images/Projects/{project.title}/</div>
            {loading ? (
              <div className="pm-no-shots">
                <span className="dim">// loading...</span>
              </div>
            ) : images.length === 0 ? (
              <div className="pm-no-shots">
                <span className="dim">
                  // no images yet — drop files into public/images/Projects/{project.title}/
                </span>
              </div>
            ) : (
              <div className="pm-shots-grid">
                {images.map((src, i) => (
                  <div key={src} className="pm-shot" onClick={() => setLightbox(i)}>
                    <img src={src} alt={`${project.title} screenshot ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pm-footer">
            <div className="pc-tags pm-tags">
              {project.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <div className="pm-links">
              {project.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="pc-link">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mtrack, setMtrack] = useState("—");
  const [martist, setMartist] = useState("");
  const [mstatus, setMstatus] = useState("connecting...");
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

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

    setMstatus("last listening");
    setMtrack("Set up Last.fm to enable");
    setMartist("Add API key & username in the code");
    setPlaying(false);

    return () => ro.disconnect();
  }, []);

  return (
    <>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}

      <section id="projects" ref={sectionRef}>
        <div className="wrap">

          <div className="section-header r">
            <div className="sh-line">
              <span className="sh-cmd"><span>~$</span> ls -la projects/</span>
              <div className="sh-rule"></div>
            </div>
            <div className="section-title">
              Selected Work <span className="dim">// 03</span>
            </div>
          </div>

          <div className="projects-layout r rd1">
            {PROJECTS.map((p) => (
              <div
                key={p.num}
                className={`${p.layout === "full" ? "p-full" : "p-half"}${p.quiet ? " pc-quiet" : ""}`}
              >
                <div className={`project-card${p.featured ? " pc-featured" : ""}`}>
                  <div className="pc-header">
                    <div className="pc-top-row">
                      <span className="pc-num">{p.num}</span>
                      <div className="pc-meta">
                        <span className={`pc-status ${p.status === "live" ? "s-live" : "s-wip"}`}>
                          {p.status === "live" ? "● live" : "◌ in progress"}
                        </span>
                        <div className="pc-links">
                          {p.links.map((l) => (
                            <a
                              key={l.label}
                              href={l.href}
                              target="_blank"
                              rel="noreferrer"
                              className="pc-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {l.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="pc-title">
                        {p.title}
                        {p.titleNote && (
                          <span style={{ color: "var(--muted)", fontSize: ".72rem", fontWeight: 400 }}>
                            {" "}{p.titleNote}
                          </span>
                        )}
                      </div>
                      <div className="pc-desc">{p.desc}</div>
                    </div>
                  </div>
                  <div className="pc-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <button className="pc-view-btn" onClick={() => setSelected(p)}>
                    view details →
                  </button>
                </div>
              </div>
            ))}
          </div>

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
    </>
  );
}
