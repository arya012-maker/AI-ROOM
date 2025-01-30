import { integer, pgTable, varchar, serial } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("imageUrl").notNull(),
  credits: integer("credits").default(3),
});

export const AiGeneratedImage = pgTable("aiGeneratedImage", {
  id: serial("id").primaryKey(),
  userEmail: varchar("userEmail").notNull(),
  roomType: varchar("roomType").notNull(),
  designType: varchar("designType").notNull(),
  additionalReq: varchar("additionalReq").notNull(),
  orgImage: varchar("orgImage").notNull(),
  aiImage: varchar("aiImage").notNull(),
});
