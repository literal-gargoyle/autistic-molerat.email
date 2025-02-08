import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSharedCodeSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Share code endpoint
  app.post("/api/share", async (req, res) => {
    try {
      const parsed = insertSharedCodeSchema.omit({ shareId: true }).parse(req.body);
      const shared = await storage.createSharedCode(parsed);
      res.json(shared);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get shared code by ID
  app.get("/api/share/:shareId", async (req, res) => {
    const { shareId } = req.params;
    const shared = await storage.getSharedCodeByShareId(shareId);

    if (!shared) {
      res.status(404).json({ message: "Shared code not found" });
      return;
    }

    res.json(shared);
  });

  // List recent shared code
  app.get("/api/share", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const shared = await storage.listRecentSharedCode(limit);
    res.json(shared);
  });

  const httpServer = createServer(app);
  return httpServer;
}