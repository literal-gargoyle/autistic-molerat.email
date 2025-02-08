import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const sharedCode = pgTable("shared_code", {
  id: serial("id").primaryKey(),
  language: text("language").notNull(),
  code: text("code").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  shareId: text("share_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSharedCodeSchema = createInsertSchema(sharedCode)
  .omit({ id: true, createdAt: true })
  .extend({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().max(500).optional(),
    code: z.string().min(1, "Code is required"),
    language: z.string().min(1, "Language is required"),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSharedCode = z.infer<typeof insertSharedCodeSchema>;
export type SharedCode = typeof sharedCode.$inferSelect;