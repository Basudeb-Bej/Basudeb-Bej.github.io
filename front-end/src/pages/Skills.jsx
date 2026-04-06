import image2 from "../assets/img/image2.png";

const skills = [
  {
    title: "Frontend",
    icon: "bi-laptop",
    description: "React, JavaScript, HTML5, CSS3, Bootstrap, responsive layouts",
  },
  {
    title: "Backend",
    icon: "bi-braces",
    description: "Node.js, Express, REST APIs, authentication flow awareness",
  },
  {
    title: "Database",
    icon: "bi-database",
    description: "MongoDB, Mongoose, data modeling, CRUD workflow design",
  },
  {
    title: "Tools",
    icon: "bi-gear-fill",
    description: "Git, GitHub, Vite, debugging, deployment-ready project setup",
  },
  {
    title: "Design",
    icon: "bi-palette",
    description: "Visual hierarchy, spacing systems, motion, and clean UI composition",
  },
  {
    title: "Working style",
    icon: "bi-stars",
    description: "Problem solving, iteration, and thoughtful delivery under deadlines",
  },
];

const Skills = () => {
  return (
    <section className="portfolio-page">
      <div className="background-grid" />
      <div className="background-orb one" />
      <div className="background-orb two" />

      <div className="portfolio-shell">
        <div className="section-heading">
          <span className="eyebrow">Skills</span>
          <h2>The stack I use to move from concept to polished interface</h2>
          <p>
           This section is designed like a capability map: it breaks down my technical strengths into a few clear categories, so that inspectors can quickly understand what I can create.
          </p>
        </div>

        <div className="portfolio-hero">
          <div className="portfolio-hero-grid">
            <div className="skill-grid">
              {skills.map((skill, index) => (
                <article className="skill-card" key={skill.title} style={{ animationDelay: `${index * 0.08}s` }}>
                  <span className="skill-icon-badge" aria-hidden="true">
                    <i className={`bi ${skill.icon}`} />
                  </span>
                  <strong>{skill.title}</strong>
                  <p>{skill.description}</p>
                </article>
              ))}
            </div>

            <div className="portfolio-panel">
              <div className="experience-card">
                <img
                  src={image2}
                  alt="MERN Stack Internship experience"
                  className="experience-image"
                />

                <div className="experience-content">
                  <span className="eyebrow">Experience</span>
                  <h3>MERN Stack Internship</h3>
                  <p>
                    Built practical 'Digital core Banking System' and web app features during a MERN stack internship,
                    focusing on React UI work, Node.js and Express flows, MongoDB data handling,
                    and turning ideas into clean user-facing screens.
                  </p>

                  <div className="chip-row">
                    <span className="skill-chip">React</span>
                    <span className="skill-chip">Node.js</span>
                    <span className="skill-chip">Express</span>
                    <span className="skill-chip">MongoDB</span>
                  </div>
                </div>
              </div>

              <span className="eyebrow">Core strengths</span>
              <p className="section-copy">
                My focus is on building clean interfaces and dependable application structure at the same time, so the final product feels polished rather than pieced together.
              </p>

              <div className="skill-spotlight">
                <span className="skill-spotlight-orb" />
                <div>
                  <strong>Animated polish</strong>
                  <p>Small motion cues, glowing badges, and layered surfaces keep the page from feeling flat.</p>
                </div>
              </div>

              <div className="chip-row">
                <span className="skill-chip">Reusable components</span>
                <span className="skill-chip">Responsive UI systems</span>
                <span className="skill-chip">Animated presentations</span>
                <span className="skill-chip">MERN stack logic</span>
              </div>

              <p className="muted-copy">
                The aim is not just to list technologies, but to show how those technologies come together in a coherent product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;