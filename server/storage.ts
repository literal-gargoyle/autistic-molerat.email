import { users, type User, type InsertUser, sharedCode, type SharedCode, type InsertSharedCode } from "@shared/schema";
import { nanoid } from "nanoid";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Shared code methods
  createSharedCode(code: Omit<InsertSharedCode, "shareId">): Promise<SharedCode>;
  getSharedCodeByShareId(shareId: string): Promise<SharedCode | undefined>;
  listRecentSharedCode(limit?: number): Promise<SharedCode[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private sharedCodes: Map<string, SharedCode>;
  private currentUserId: number;
  private currentCodeId: number;

  constructor() {
    this.users = new Map();
    this.sharedCodes = new Map();
    this.currentUserId = 1;
    this.currentCodeId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSharedCode(code: Omit<InsertSharedCode, "shareId">): Promise<SharedCode> {
    const id = this.currentCodeId++;
    const shareId = nanoid(10);
    const sharedCode: SharedCode = {
      ...code,
      id,
      shareId,
      createdAt: new Date(),
    };
    this.sharedCodes.set(shareId, sharedCode);
    return sharedCode;
  }

  async getSharedCodeByShareId(shareId: string): Promise<SharedCode | undefined> {
    return this.sharedCodes.get(shareId);
  }

  async listRecentSharedCode(limit: number = 10): Promise<SharedCode[]> {
    return Array.from(this.sharedCodes.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();