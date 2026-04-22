"use client";
import { useReveal } from "./useReveal";

const interests = [
  {
    icon: "✏️",
    title: "Drawing",
    description:
      "Sketching characters and scenes by hand — a meditative break from screens and a way to keep the creative muscle sharp.",
    color: "#C4552A",
  },
  {
    icon: "⛩️",
    title: "Anime",
    description:
      "Old classics hold a special place: Code Geass, Dragon Ball, Naruto. Stories with real depth, strategy, and unforgettable characters.",
    color: "#E8A020",
    highlight: ["Code Geass", "Dragon Ball", "Naruto"],
  },
  {
    icon: "📖",
    title: "Reading",
    description:
      "From technical books to fiction — reading expands perspective and fuels both the analytical and imaginative sides of the brain.",
    color: "#4A6741",
  },
  {
    icon: "🎸",
    title: "Guitar",
    description:
      "Learning chords and exploring music as a language. There's a satisfying parallel between music theory and programming logic.",
    color: "#8B9EA8",
  },
  {
    icon: "🎹",
    title: "Piano",
    description:
      "A second musical interest — drawn to the piano's range and expressiveness. Still in the learning phase, enjoying every step.",
    color: "#6B8CAE",
  },
];

export default function Interests() {
  const ref = useReveal();

  return (
    <section id="interests" className="py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div className="reveal flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-amber tracking-widest uppercase">
            04 / Interests
          </span>
          <span className="h-px flex-1 max-w-xs bg-paper/10" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start mb-16">
          <div className="reveal">
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Beyond the
              <br />
              <span className="italic text-amber">terminal</span>
            </h2>
          </div>
          <div className="reveal reveal-delay-1">
            <p className="text-paper/55 leading-relaxed text-lg">
              The things that keep me inspired outside of tech. Creativity,
              storytelling, and music all feed back into how I think about
              building software.
            </p>
          </div>
        </div>

        {/* Interests grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {interests.map((item, i) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${(i % 3) + 1} group border border-paper/8 p-6 bg-ink-soft hover:border-amber/20 transition-all duration-300 cursor-default`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl shrink-0 border border-paper/10 group-hover:border-opacity-40 transition-colors"
                  style={{ borderColor: `${item.color}33` }}
                >
                  {item.icon}
                </div>

                <div>
                  <h3
                    className="font-display font-semibold text-lg mb-2 group-hover:text-amber transition-colors duration-200"
                    style={{ color: `${item.color}` }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-paper/50 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Anime highlights */}
                  {item.highlight && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.highlight.map((h) => (
                        <span
                          key={h}
                          className="font-mono text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${item.color}15`,
                            color: item.color,
                            border: `1px solid ${item.color}30`,
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
