import { Router } from "express";
import { templates } from "../data/store.js";

const templatesRouter = Router();

templatesRouter.get("/", (_req, res) => {
  return res.json({ templates });
});

export { templatesRouter };
