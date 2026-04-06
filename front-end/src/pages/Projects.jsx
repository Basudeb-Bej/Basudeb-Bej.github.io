import { Link } from "react-router-dom";

const projects = [
  {
    number: "01",
    title: "Portfolio Studio",
    description:
      "A clean personal branding experience that pairs premium typography, animated surfaces, and clear section hierarchy.",
    details: ["React", "Responsive UI", "Motion-ready layout"],
    bullets: [
      "Built to present my portfolio with a premium, polished feel.",
      "Focuses on clear hierarchy, smooth sections, and responsive structure.",
      "Shows how I combine UI design and frontend implementation.",
    ],
    link: "#",
    linkLabel: "Talk about this project",
  },
  {
    number: "02",
    title: "Weather-X",
    description:
      "Weather X is a sleek weather app that provides real-time conditions, forecasts, and location-based updates in a simple, modern interface.",
    details: ["Live updates", "Interactive UI"],
    bullets: [
      "Built as a live weather application with real-time data visualization.",
      "Focused on simple navigation and clear weather information display.",
      "Provides accurate and up-to-date weather information for any location.",
    ],
    link: "https://weather-x-topaz.vercel.app/",
    linkLabel: "Open live demo",
  },
];

const Projects = () => {
  return (
    <section className="portfolio-page">
      <div className="background-grid" />
      <div className="background-orb one" />
      <div className="background-orb two" />

      <div className="portfolio-shell">
        <div className="section-heading">
          <span className="eyebrow">Projects</span>
          <h2>Featured work and concepts with a polished presentation</h2>
          <p>
            These cards are designed to look like the projects I show in my portfolio: clear standards, visible structure, and enough detail to understand what was created.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <header>
                <div>
                  <span className="project-number">{project.number}</span>
                  <h3>{project.title}</h3>
                </div>
                <span className="project-tag">Featured</span>
              </header>

              <p>{project.description}</p>

              <div className="chip-row">
                {project.details.map((detail) => (
                  <span className="skill-chip" key={detail}>
                    {detail}
                  </span>
                ))}
              </div>

              <div className="divider-line" />

              <ul>
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              {project.link && project.link.startsWith("http") ? (
                <a href={project.link} className="project-link" target="_blank" rel="noreferrer">
                  {project.linkLabel} <i className="bi bi-arrow-right" />
                </a>
              ) : (
                <Link to="/contact" className="project-link">
                  {project.linkLabel} <i className="bi bi-arrow-right" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;