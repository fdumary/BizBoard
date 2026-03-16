import { Router } from "express";
import { z } from "zod";
import { cards } from "../data/store.js";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
import { generateQrDataUrl } from "../services/qr.js";

const cardInputSchema = z.object({
  title: z.string().min(1),
  bio: z.string().min(1),
  links: z.array(z.string().url()).default([]),
  templateId: z.string().min(1)
});

const cardsRouter = Router();

cardsRouter.use(requireAuth);

cardsRouter.get("/", (req: AuthenticatedRequest, res) => {
  const ownCards = cards.filter((card) => card.userId === req.user?.id);
  return res.json({ cards: ownCards });
});

cardsRouter.post("/", async (req: AuthenticatedRequest, res) => {
  const parsed = cardInputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.flatten() });
  }

  const id = `c${cards.length + 1}`;
  const slug = parsed.data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const publicUrl = `${req.protocol}://${req.get("host")}/api/public/cards/${slug}`;

  const qrCodeUrl = await generateQrDataUrl(publicUrl);

  const newCard = {
    id,
    userId: req.user?.id ?? "u1",
    title: parsed.data.title,
    bio: parsed.data.bio,
    links: parsed.data.links,
    templateId: parsed.data.templateId,
    urlSlug: slug || id,
    qrCodeUrl,
    createdAt: new Date().toISOString()
  };

  cards.push(newCard);
  return res.status(201).json({ card: newCard });
});

cardsRouter.put("/:cardId", async (req: AuthenticatedRequest, res) => {
  const parsed = cardInputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.flatten() });
  }

  const card = cards.find((item) => item.id === req.params.cardId && item.userId === req.user?.id);
  if (!card) {
    return res.status(404).json({ message: "Card not found." });
  }

  const publicUrl = `${req.protocol}://${req.get("host")}/api/public/cards/${card.urlSlug}`;
  const qrCodeUrl = await generateQrDataUrl(publicUrl);

  card.title = parsed.data.title;
  card.bio = parsed.data.bio;
  card.links = parsed.data.links;
  card.templateId = parsed.data.templateId;
  card.qrCodeUrl = qrCodeUrl;

  return res.json({ card });
});

cardsRouter.delete("/:cardId", (req: AuthenticatedRequest, res) => {
  const index = cards.findIndex((item) => item.id === req.params.cardId && item.userId === req.user?.id);
  if (index < 0) {
    return res.status(404).json({ message: "Card not found." });
  }

  cards.splice(index, 1);
  return res.status(204).send();
});

cardsRouter.get("/:cardId/qr", (req: AuthenticatedRequest, res) => {
  const card = cards.find((item) => item.id === req.params.cardId && item.userId === req.user?.id);
  if (!card) {
    return res.status(404).json({ message: "Card not found." });
  }

  return res.json({ qrCodeUrl: card.qrCodeUrl });
});

export { cardsRouter };
