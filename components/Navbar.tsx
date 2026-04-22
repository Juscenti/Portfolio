"use client";

export default function Navbar() {
  const toggleTheme = () => {
    const b = document.body;
    const btn = document.getElementById("thm");
    if (b.getAttribute("data-theme") === "light") {
      b.removeAttribute("data-theme");
      if (btn) btn.textContent = "light";
    } else {
      b.setAttribute("data-theme", "light");
      if (btn) btn.textContent = "dark";
    }
  };

  return (
    <nav id="nav">
      <div className="nav-inner">
        <div className="nav-logo">[<span>kf</span>]</div>
        <div className="nav-r">
          <a href="#about">about</a>
          <a href="#skills">skills</a>
          <a href="#projects">projects</a>
          <a href="#lavitur">lavitur</a>
          <a href="#contact">contact</a>
          <button id="thm" onClick={toggleTheme}>light</button>
        </div>
      </div>
    </nav>
  );
}
