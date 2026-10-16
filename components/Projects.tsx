"use client";

import { useEffect, useRef, useState } from "react";

type ProjectLink = { label: string; href: string };
type Project = {
  num: string;
  title: string;
  titleNote?: string;
  desc: string;
  role?: string;
  notes?: string[];
  status: "shipped" | "live" | "wip";
  tags: string[];
  links: ProjectLink[];
  layout: "full" | "half";
  quiet?: boolean;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    num: "001",
    title: "Cite",
    role: "Co-founder · 2026 to now",
    desc: "A live map of UTech, UWI Mona and Kingston, written by the people who are there. Students drop pins for study spots and bathrooms, post how long the line is, flag a flooded road. Reports expire on their own, so what you see is what's true now. Free on the App Store.",
    notes: [
      "1.0 went out on the App Store on Sep 10, 2026. We were on 1.8 by Sep 30.",
      "Campus search reads UTech room codes: 47A1 is building 47, floor A, room 1.",
      "Walking directions use our own router over a hand-built campus grid. Routing on OpenStreetMap paths came out about 1.9× longer.",
      "Missing-person alerts need two confirmations before they show beyond the area they were posted in.",
    ],
    status: "shipped",
    tags: ["React Native", "Expo", "Supabase", "PostgreSQL", "Maps", "iOS"],
    links: [
      { label: "app store", href: "https://apps.apple.com/us/app/cite-community-mapping/id6807413740" },
      { label: "joincite.com", href: "https://joincite.com" },
    ],
    layout: "full",
    featured: true,
  },
  {
    num: "002",
    title: "WordHunter",
    desc: "Solver for Word Hunt boards. Paste in a 4×4, 5×5, circle or X board and it finds every valid word, draws the path, and sorts them by score.",
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
    desc: "Mobile app for event logistics and coordinating people on the day. React Native and Expo on the front, PostgreSQL behind it, with the app, API and database kept in separate layers.",
    status: "wip",
    tags: ["TypeScript", "React Native", "Expo", "PostgreSQL", "Full-Stack", "Mobile"],
    links: [{ label: "github", href: "https://github.com/Juscenti/LiveLine" }],
    layout: "half",
  },
  {
    num: "004",
    title: "Lavitur",
    titleNote: "// the brand site",
    desc: "The site for Lavitur, my clothing brand. Designed and built from scratch alongside the first collection.",
    status: "wip",
    tags: ["Web", "Brand", "E-Commerce", "Design"],
    links: [{ label: "github", href: "https://github.com/Juscenti/lavitur" }],
    layout: "full",
    quiet: true,
  },
];

const STATUS: Record<Project["status"], { cls: string; label: string }> = {
  shipped: { cls: "s-live", label: "● on the app store" },
  live:    { cls: "s-live", label: "● live" },
  wip:     { cls: "s-wip",  label: "◌ in progress" },
};

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
              <span className={`pc-status ${STATUS[project.status].cls}`}>
                {STATUS[project.status].label}
              </span>
              <button className="pm-close" onClick={onClose}>[×] close</button>
            </div>
          </div>

          <div className="pm-desc">{project.desc}</div>

          {project.notes && (
            <div className="pm-section">
              <div className="pm-section-label">{project.role ?? "notes"}</div>
              <ul className="pc-notes">
                {project.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          )}

          <div className="pm-section">
            <div className="pm-section-label">screenshots</div>
            {loading ? (
              <div className="pm-no-shots">
                <span className="dim">loading...</span>
              </div>
            ) : images.length === 0 ? (
              <div className="pm-no-shots">
                <span className="dim">screenshots coming soon</span>
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
              <span className="sh-cmd"><span>~/</span>projects</span>
              <div className="sh-rule"></div>
            </div>
            <div className="section-title">
              Work <span className="dim">// shipped and in progress</span>
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
                        <span className={`pc-status ${STATUS[p.status].cls}`}>
                          {STATUS[p.status].label}
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
                      {p.role && <div className="pc-role">{p.role}</div>}
                      <div className="pc-desc">{p.desc}</div>
                      {p.featured && p.notes && (
                        <ul className="pc-notes">
                          {p.notes.map((n) => <li key={n}>{n}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="pc-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  {p.title === "Lavitur" ? (
                    <button className="pc-classified-btn" onClick={() => setSelected(p)}>
                      <span className="cf-bar" aria-hidden="true"></span>
                      <span className="cf-text" data-text="[ CLASSIFIED ]">[ CLASSIFIED ]</span>
                      <span className="cf-bar cf-bar-r" aria-hidden="true"></span>
                    </button>
                  ) : (
                    <button className="pc-view-btn" onClick={() => setSelected(p)}>
                      {p.featured ? "screenshots →" : "details →"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
