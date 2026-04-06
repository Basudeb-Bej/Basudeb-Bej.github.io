import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-panel">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-kicker">Basudeb Bej</span>
              <h6>Building polished web experiences with a focus on clarity, performance, and practical delivery</h6>
              <p className="footer-note">
                MERN Stack Developer passionate about creating modern, scalable,
                and user-friendly applications
              </p>
            </div>

            <div className="footer-links">
              <h3>Quick Links</h3>
              <div className="footer-links-columns">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/education">Education</Link></li>
                </ul>

                <ul>
                  <li><Link to="/skills">Skills</Link></li>
                  <li><Link to="/projects">Projects</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>

            <div className="footer-connect">
              <h3>Connect</h3>
              <p className="footer-note footer-connect-copy">
                Follow along on GitHub, LinkedIn, and other channels for updates and project work
              </p>

              <div className="footer-socials">
                <a href="https://github.com/Basudeb-Bej" target="_blank" rel="noreferrer" aria-label="GitHub" className="footer-social">
                  <i className="bi bi-github" />
                </a>
                <a href="https://x.com/Basudeb_Bej" target="_blank" rel="noreferrer" aria-label="X" className="footer-social">
                  <i className="bi bi-twitter-x" />
                </a>
                <a href="https://www.linkedin.com/in/basudeb-bejps2b-div/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-social">
                  <i className="bi bi-linkedin" />
                </a>
                <a href="https://www.youtube.com/@B9s9d0b7B3j" target="_blank" rel="noreferrer" aria-label="YouTube" className="footer-social">
                  <i className="bi bi-youtube" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="mb-0 footer-note">© {new Date().getFullYear()} Basudeb Bej. All rights reserved.</p>
            <span className="footer-bottom-tag">Portfolio Website</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;