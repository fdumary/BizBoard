import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Card, Template } from "@bizboard/shared";
import { fetchPublicCard } from "../lib/api";

type PublicPayload = {
  card: Card;
  template?: Template;
  documents: Array<{ id: string; filename: string; url: string }>;
};

function PublicCardPage() {
  const { slug = "" } = useParams();
  const [payload, setPayload] = useState<PublicPayload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchPublicCard(slug);
        setPayload(result);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load card.");
      }
    };
    load().catch(() => setError("Unable to load card."));
  }, [slug]);

  if (error) {
    return <main className="container"><p style={{ color: "#9e2a2b" }}>{error}</p></main>;
  }

  if (!payload) {
    return <main className="container"><p>Loading card...</p></main>;
  }

  const { card, template, documents } = payload;

  return (
    <main className="container">
      <section className="panel">
        <h1>{card.title}</h1>
        <p>{card.bio}</p>
        <p><strong>Template:</strong> {template?.name ?? card.templateId}</p>
        <h2>Links</h2>
        <ul>
          {card.links.map((link) => (
            <li key={link}><a href={link} target="_blank" rel="noreferrer">{link}</a></li>
          ))}
        </ul>
        <h2>Documents</h2>
        {documents.length === 0 ? <p className="muted">No documents uploaded yet.</p> : (
          <ul>
            {documents.map((document) => (
              <li key={document.id}><a href={document.url}>{document.filename}</a></li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export { PublicCardPage };
