import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Card, Template } from "@bizboard/shared";
import { createCard, fetchCards, fetchTemplates } from "../lib/api";
import { NavigationBar } from "../NavigationBar";

function DashboardPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("My Business Card");
  const [bio, setBio] = useState("Add your professional summary.");
  const [links, setLinks] = useState("https://portfolio.example.com");
  const [templateId, setTemplateId] = useState("classic");

  useEffect(() => {
    const run = async () => {
      try {
        const [cardResponse, templateResponse] = await Promise.all([fetchCards(), fetchTemplates()]);
        setCards(cardResponse.cards);
        setTemplates(templateResponse.templates);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    run().catch(() => {
      setError("Unexpected load error.");
      setLoading(false);
    });
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await createCard({
        title,
        bio,
        links: links.split(",").map((item) => item.trim()).filter(Boolean),
        templateId
      });
      setCards((current) => [response.card, ...current]);
      setTitle("New Card");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to create card.");
    }
  };

  if (loading) {
    return <main className="container"><p>Loading dashboard...</p></main>;
  }

  return (
    <main className="container grid" style={{ gap: "1.2rem" }}>
      <NavigationBar />

      <section className="panel">
        <h1>Dashboard</h1>
        <p className="muted">Create your public profile card, then share it as a URL or QR code.</p>
      </section>

      <section className="panel">
        <h2>Create card</h2>
        <form onSubmit={onSubmit} className="grid grid-2">
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} required />
          </div>
          <div>
            <label htmlFor="template">Template</label>
            <select id="template" value={templateId} onChange={(event) => setTemplateId(event.target.value)}>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" value={bio} onChange={(event) => setBio(event.target.value)} rows={3} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="links">Links (comma separated)</label>
            <input id="links" value={links} onChange={(event) => setLinks(event.target.value)} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <button type="submit">Save card</button>
          </div>
        </form>
        {error && <p style={{ color: "#9e2a2b" }}>{error}</p>}
      </section>

      <section className="panel">
        <h2>Your cards</h2>
        {cards.length === 0 ? <p className="muted">No cards yet.</p> : (
          <div className="grid">
            {cards.map((card) => (
              <article key={card.id} className="card">
                <h3>{card.title}</h3>
                <p>{card.bio}</p>
                <div>
                  <span className="tag">Template: {card.templateId}</span>
                  <Link to={`/public/${card.urlSlug}`}>Open public card</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export { DashboardPage };
