const About = () => {
  return (
    <section className="portfolio-page">
      <div className="background-grid" />
      <div className="background-orb one" />
      <div className="background-orb two" />

      <div className="portfolio-shell">
        <div className="section-heading about-heading">
          <span className="eyebrow">About Me</span>
          <h2>I build with intent, not just code</h2>
          <p>
            I focus on creating interfaces that feel premium, readable, and simple to use. My work combines thoughtful layout, responsive design, and practical full stack development so the final product feels complete from the first scroll.
          </p>
          <div className="about-badge-row">
            <span className="about-chip"><i className="bi bi-brush-fill" /> UI polish</span>
            <span className="about-chip"><i className="bi bi-lightning-charge-fill" /> Fast build flow</span>
            <span className="about-chip"><i className="bi bi-phone-fill" /> Responsive first</span>
          </div>
        </div>

        <div className="portfolio-hero about-hero">
          <div className="portfolio-panel about-panel">
            <span className="eyebrow">My approach</span>
            <div className="about-hero-copy">
              <h3 className="about-title">Design with clarity. Build with purpose</h3>
              <p className="section-copy">
                I like building web pages the way a product designer and a frontend engineer would think together: clear hierarchy, smooth spacing, clean components, and motion that supports the message instead of distracting from it.
              </p>
            </div>

            <div className="about-icon-row">
              <div className="about-icon-badge">
                <i className="bi bi-stars" />
                <span>Creative details</span>
              </div>
              <div className="about-icon-badge">
                <i className="bi bi-lightning-charge-fill" />
                <span>Fast execution</span>
              </div>
              <div className="about-icon-badge">
                <i className="bi bi-phone" />
                <span>Responsive design</span>
              </div>
              <div className="about-icon-badge">
                <i className="bi bi-palette" />
                <span>Visual polish</span>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-card about-info-card">
                <div className="about-info-top">
                  <span className="about-info-icon">
                    <i className="bi bi-layout-text-window-reverse" />
                  </span>
                  <strong>Design-first presentation</strong>
                </div>
                <p>Strong visual rhythm, modern type, and consistent spacing.</p>
              </div>
              <div className="info-card about-info-card">
                <div className="about-info-top">
                  <span className="about-info-icon">
                    <i className="bi bi-code-slash" />
                  </span>
                  <strong>Practical development</strong>
                </div>
                <p>Reusable React components and clean integration patterns.</p>
              </div>
              <div className="info-card about-info-card">
                <div className="about-info-top">
                  <span className="about-info-icon">
                    <i className="bi bi-phone" />
                  </span>
                  <strong>Responsive thinking</strong>
                </div>
                <p>Layouts that adapt smoothly without losing structure.</p>
              </div>
              <div className="info-card about-info-card">
                <div className="about-info-top">
                  <span className="about-info-icon">
                    <i className="bi bi-check2-circle" />
                  </span>
                  <strong>Reliable delivery</strong>
                </div>
                <p>Focused on polished results that are easy to maintain.</p>
              </div>
            </div>

            <div className="divider-line" />

            <ul className="portfolio-list">
              <li>Frontend direction with React, Bootstrap, and custom CSS systems.</li>
              <li>Backend awareness with Node, Express, and MongoDB workflows.</li>
              <li>Content structure that keeps a website easy to scan and remember.</li>
            </ul>

            <div className="about-mini-stats">
              <div className="about-mini-stat">
                <i className="bi bi-window-stack" />
                <div>
                  <strong>UI</strong>
                  <span>Clean layouts</span>
                </div>
              </div>
              <div className="about-mini-stat">
                <i className="bi bi-stars" />
                <div>
                  <strong>Motion</strong>
                  <span>Smooth accents</span>
                </div>
              </div>
              <div className="about-mini-stat">
                <i className="bi bi-bullseye" />
                <div>
                  <strong>Focus</strong>
                  <span>User-first design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;