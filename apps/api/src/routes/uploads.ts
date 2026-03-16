import { Router } from "express";
import { z } from "zod";
import { documents } from "../data/store.js";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
import { validateDocumentUpload } from "../services/uploadValidation.js";

const uploadRouter = Router();

const uploadSchema = z.object({
  cardId: z.string().min(1),
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  base64: z.string().min(1)
});

uploadRouter.use(requireAuth);

uploadRouter.post("/", async (req: AuthenticatedRequest, res) => {
  const parsed = uploadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.flatten() });
  }

  const buffer = Buffer.from(parsed.data.base64, "base64");
  const validation = await validateDocumentUpload(parsed.data.filename, parsed.data.mimeType, buffer);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.reason, detectedMime: validation.detectedMime });
  }

  const doc = {
    id: `d${documents.length + 1}`,
    cardId: parsed.data.cardId,
    filename: parsed.data.filename,
    mimeType: validation.detectedMime ?? parsed.data.mimeType,
    url: `/storage/${parsed.data.filename}`,
    uploadedAt: new Date().toISOString()
  };

  documents.push(doc);
  return res.status(201).json({ document: doc });
});

uploadRouter.get("/:cardId", (req: AuthenticatedRequest, res) => {
  const result = documents.filter((doc) => doc.cardId === req.params.cardId);
  return res.json({ documents: result });
});

export { uploadRouter };
