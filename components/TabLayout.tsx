"use client";

import { useState, useEffect } from "react";
import Hero from "./Hero";
import SkillsSummary from "./SkillsSummary";
import Lavitur from "./Lavitur";
import Projects from "./Projects";
import Skills from "./Skills";
import About from "./About";
import Experience from "./Experience";
import Contact from "./Contact";

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="tab-container">
      {/* Tab Navigation */}
      <nav className={`tab-nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="tab-nav-inner">
          <div className="tab-logo">[<span>kf</span>]</div>
          <div className="tab-nav-buttons">
            <button
              className={`tab-btn ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              home
            </button>
            <button
              className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              projects
            </button>
            <button
              className={`tab-btn ${activeTab === "skills" ? "active" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              skills
            </button>
            <button
              className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              about
            </button>
            <button
              className={`tab-btn ${activeTab === "experience" ? "active" : ""}`}
              onClick={() => setActiveTab("experience")}
            >
              experience
            </button>
          </div>
          <div className="tab-nav-end">
            <button
              id="thm"
              onClick={() => {
                const b = document.body;
                const btn = document.getElementById("thm");
                if (b.getAttribute("data-theme") === "light") {
                  b.removeAttribute("data-theme");
                  if (btn) btn.textContent = "light";
                } else {
                  b.setAttribute("data-theme", "light");
                  if (btn) btn.textContent = "dark";
                }
              }}
            >
              light
            </button>
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "home" && (
          <div className="tab-pane home-pane">
            <Hero />
            <SkillsSummary />
            <Lavitur />
          </div>
        )}

        {activeTab === "projects" && (
          <div className="tab-pane">
            <Projects />
          </div>
        )}

        {activeTab === "skills" && (
          <div className="tab-pane">
            <Skills />
          </div>
        )}

        {activeTab === "about" && (
          <div className="tab-pane">
            <About />
          </div>
        )}

        {activeTab === "experience" && (
          <div className="tab-pane">
            <Experience />
            <Contact />
          </div>
        )}
      </div>
    </div>
  );
}
