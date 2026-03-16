import type { NextFunction, Request, Response } from "express";

type AuthenticatedRequest = Request & {
  user?: {
    id: string;
    role: "user" | "admin";
  };
};

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header." });
  }

  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return res.status(401).json({ message: "Invalid Authorization header." });
  }

  // Placeholder for Firebase token verification.
  req.user = {
    id: token === "demo-admin" ? "u1" : "u1",
    role: token === "demo-admin" ? "admin" : "user"
  };

  return next();
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }
  return next();
}

export type { AuthenticatedRequest };
