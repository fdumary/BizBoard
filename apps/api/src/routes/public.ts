import { Router } from "express";
import { cards, documents, templates } from "../data/store.js";

const publicRouter = Router();

publicRouter.get("/cards/:slug", (req, res) => {
  const card = cards.find((item) => item.urlSlug === req.params.slug);
  if (!card) {
    return res.status(404).json({ message: "Card not found." });
  }

  const template = templates.find((item) => item.id === card.templateId);
  const cardDocuments = documents.filter((doc) => doc.cardId === card.id);

  return res.json({
    card,
    template,
    documents: cardDocuments
  });
});

export { publicRouter };
