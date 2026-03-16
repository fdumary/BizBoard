import type { NextFunction, Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  const message = error instanceof Error ? error.message : "Unexpected server error.";
  res.status(500).json({ message });
}
