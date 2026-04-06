import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import image from "../assets/img/image1.png";

const Home = () => {
  return (
    <section className="portfolio-page home-page">
      <div className="background-grid" />
      <div className="background-orb one" />
      <div className="background-orb two" />

      <div className="portfolio-shell">
        <div className="portfolio-hero">
          <div className="portfolio-hero-grid">
            <div>
              <span className="eyebrow">MERN Stack Developer</span>
              <h1 className="section-title">
                I design and build <strong>modern web experiences</strong> that feel polished, fast, and personal
              </h1>
              <p className="section-copy">
                I create responsive interfaces, practical API-driven features, and visual systems that make a website feel premium. The focus is always the same: clarity, usability, and a strong first impression
              </p>

              <div className="hero-type-line">
                <span className="hero-type-label">Focused on</span>
                <TypeAnimation
                  sequence={[
                    "React interfaces and polished UI design",
                    1800,
                    "Node.js APIs and Express servers",
                    1800,
                    "MongoDB data layers and schemas",
                    1800,
                    "Professional UI design",
                    1800,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="hero-type-text"
                />
              </div>

              <div className="hero-actions">
                <Link to="/projects" className="portfolio-btn portfolio-btn-primary">
                  View Projects <i className="bi bi-arrow-right" />
                </Link>
                <Link to="/contact" className="portfolio-btn portfolio-btn-secondary">
                  Contact Me <i className="bi bi-send" />
                </Link>
              </div>

              <div className="hero-feature-grid">
                <article className="hero-feature-card">
                  {/* <span className="hero-feature-index">01</span> */}
                  <strong>Responsive</strong>
                  <p>Built to look sharp on desktop, tablet, and mobile</p>
                </article>

                <article className="hero-feature-card">
                  {/* <span className="hero-feature-index">02</span> */}
                  <strong>Structured</strong>
                  <p>Reusable components and clean section flow throughout</p>
                </article>

                <article className="hero-feature-card">
                  {/* <span className="hero-feature-index">03</span> */}
                  <strong>Modern</strong>
                  <p>Animated backgrounds, glass surfaces, and strong typography</p>
                </article>
              </div>
            </div>

            <div className="portfolio-visual">
              <div className="profile-card">
                <div className="profile-ring">
                  <img src={image} alt="Basudeb Bej profile" />
                </div>

                <div className="profile-meta">
                  <span className="meta-chip">Basudeb Bej</span>
                  <h2>MERN Stack Developer</h2>
                  <p>
                    Crafting interactive websites with a balance of design,
                    usability, and performance
                  </p>
                </div>
              </div>

              <div className="floating-tag one">React + UI</div>
              <div className="floating-tag two">Node + APIs</div>
              <div className="floating-tag three">MongoDB</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;