import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  return res.json({
    token: "demo-user",
    user: {
      id: "u1",
      name: "Demo User",
      email,
      role: "user"
    }
  });
});

authRouter.get("/me", (_req, res) => {
  return res.json({
    id: "u1",
    name: "Demo User",
    email: "demo@bizboard.app",
    role: "user"
  });
});

export { authRouter };
