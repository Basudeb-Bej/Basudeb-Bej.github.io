import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import image from "../assets/img/image1.png";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const closeNavbar = () => {
    setIsExpanded(false);
  };

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY.current + 6) {
        setIsHidden(true);
        setIsExpanded(false);
      } else if (currentScrollY < lastScrollY.current - 6) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm fixed-top w-100 py-2 navbar-scroll ${
        isHidden ? "navbar-scroll-hidden" : ""
      } ${
        theme === "light" ? "navbar-light bg-white" : "navbar-dark bg-dark"
      }`}
      style={{
        borderRadius: "50px",
        margin: "16px auto",
        left: "0",
        right: "0",
        maxWidth: "min(1180px, calc(100vw - 24px))",
        zIndex: 1030,
      }}
    >
      <div className="container">

        {/* Brand */}
        <Link
          className="navbar-brand navbar-brand-stack fw-bold d-flex align-items-center"
          to="/"
          onClick={closeNavbar}
          style={{ letterSpacing: "1px", textDecoration: "none" }}
        >
          <img
            src={image}
            alt="Logo"
            style={{
              height: "40px",
              marginRight: "10px",
              borderRadius: "50%",
            }}
          />
          <span className="navbar-brand-copy">
            <span className="navbar-brand-title">Basudeb Bej</span>
            <span className="navbar-brand-subtitle">MERN Stack Developer</span>
          </span>
        </Link>

        {/* Toggler */}
        <button className="navbar-toggler" type="button" onClick={handleToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isExpanded ? "show" : ""
          }`}
        >
          <ul className="navbar-nav align-items-center">

            {/* 🌙 Theme Toggle */}
            <li className="nav-item ms-3 ms-lg-4">
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
                title="Dark/Light Theme"
              >
                {theme === "light" ? (
                  // Moon Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="theme-toggle-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                ) : (
                  // Sun Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="theme-toggle-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                )}
              </button>
            </li>

            <li className="nav-item ms-3 ms-lg-4">
              <Link className="nav-link fw-bold" to="/" onClick={closeNavbar}>
                Home
              </Link>
            </li>

            <li className="nav-item ms-3 ms-lg-4">
              <Link className="nav-link fw-bold" to="/about" onClick={closeNavbar}>
                About
              </Link>
            </li>

            <li className="nav-item ms-3 ms-lg-4">
              <Link className="nav-link fw-bold" to="/education" onClick={closeNavbar}>
                Education
              </Link>
            </li>

            <li className="nav-item ms-3 ms-lg-4">
              <Link className="nav-link fw-bold" to="/skills" onClick={closeNavbar}>
                Skills
              </Link>
            </li>

            <li className="nav-item ms-3 ms-lg-4">
              <Link className="nav-link fw-bold" to="/projects" onClick={closeNavbar}>
                Projects
              </Link>
            </li>

            <li className="nav-item ms-3 ms-lg-4">
              <Link className="nav-link fw-bold" to="/contact" onClick={closeNavbar}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;