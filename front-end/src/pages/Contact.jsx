import { useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message right now.");
      }

      setStatus({
        type: "success",
        message: result.message || "Message sent successfully.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong while sending the message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="portfolio-page">
      <div className="background-grid" />
      <div className="background-orb one" />
      <div className="background-orb two" />

      <div className="portfolio-shell">
        <div className="section-heading contact-heading">
          <span className="eyebrow">Contact</span>
          <h2>Start a conversation that feels clear, direct, and easy to act on</h2>
          <p>
           Use the form below to communicate my ideas, timeline, and the results I want. The format remains simple, but the presentation now feels more purposeful and sophisticated.
          </p>
          <div className="contact-badge-row">
            <span className="contact-chip contact-chip-strong">Project inquiries</span>
            <span className="contact-chip contact-chip-strong">Freelance work</span>
            <span className="contact-chip contact-chip-strong">Collaboration</span>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-card contact-card-primary">
            <span className="eyebrow">Send a message</span>
            <div className="contact-hero-copy">
              <h3>Share your idea, timeline, and what success looks like</h3>
              <p className="contact-copy">
                I like working on projects where the goal is clear and the experience matters. A short brief is enough to get a conversation started.
              </p>
            </div>

            <div className="contact-inline-stats">
              <div className="contact-mini-stat">
                <strong>Fast reply</strong>
                <span>Usually within 24 hours</span>
              </div>
              <div className="contact-mini-stat">
                <strong>Best fit</strong>
                <span>Landing pages and website builds</span>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label className="contact-label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="contact-input"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="contact-input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact-input contact-textarea"
                  placeholder="Tell me about your project"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {status.message ? (
                <div className={`contact-status ${status.type}`}>
                  <i className={`bi ${status.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"}`} />
                  <p>{status.message}</p>
                </div>
              ) : null}

              <button className="portfolio-btn portfolio-btn-primary contact-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </form>

            <div className="contact-methods">
              <div className="contact-method">
                <i className="bi bi-github" />
                <div>
                  <strong>GitHub</strong>
                  <a href="https://github.com/Basudeb-Bej" target="_blank" rel="noreferrer">
                    Github Profile 
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <i className="bi bi-linkedin" />
                <div>
                  <strong>LinkedIn</strong>
                  <a href="https://www.linkedin.com/in/basudeb-bejps2b-div/" target="_blank" rel="noreferrer">
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <i className="bi bi-twitter-x" />
                <div>
                  <strong>X</strong>
                  <a href="https://x.com/Basudeb_Bej" target="_blank" rel="noreferrer">
                    Twitter Profile
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <i className="bi bi-youtube" />
                <div>
                  <strong>YouTube</strong>
                  <a href="https://www.youtube.com/@B9s9d0b7B3j" target="_blank" rel="noreferrer">
                    YouTube Channel
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-card contact-card-side">
            <span className="eyebrow">What to include</span>
            <div className="portfolio-panel contact-panel-spotlight">
              <div className="contact-panel-header">
                <p className="contact-panel-kicker">Helpful details</p>
                <h3>What makes a message easier to answer</h3>
              </div>

              <div className="info-grid contact-info-grid">
                <div className="info-card">
                  <strong>Project type</strong>
                  <p>Tell me whether it is a landing page, dashboard, app, or website.</p>
                </div>
                <div className="info-card">
                  <strong>Timeline</strong>
                  <p>Let me know if this is exploratory, urgent, or planned for a later launch.</p>
                </div>
                <div className="info-card">
                  <strong>Goal</strong>
                  <p>Describe the result you want, whether it is visibility, conversion, or usability.</p>
                </div>
                <div className="info-card">
                  <strong>Preference</strong>
                  <p>Share any style references, stack preferences, or features you want included.</p>
                </div>
              </div>
            </div>

            <div className="divider-line" />

            <div className="contact-availability">
              <div className="availability-card">
                <i className="bi bi-chat-square-dots" />
                <div>
                  <strong>Response style</strong>
                  <p>Short, direct, and focused on what to build next.</p>
                </div>
              </div>
              <div className="availability-card">
                <i className="bi bi-lightning-charge" />
                <div>
                  <strong>Preferred projects</strong>
                  <p>Personal websites, landing pages, and UI-focused MERN work.</p>
                </div>
              </div>
            </div>

            <div className="tag-row">
              <span className="contact-chip">Fast response</span>
              <span className="contact-chip">Clean UI</span>
              <span className="contact-chip">MERN ready</span>
              <span className="contact-chip">Responsive design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;