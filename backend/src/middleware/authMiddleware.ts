import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id?: string };

    if (!decoded.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
