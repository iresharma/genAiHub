import { relations } from "drizzle-orm";
import { json, pgTable, text, timestamp, integer, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  companyName: text("company_name").notNull(),
  companyDescription: text("company_description").notNull(),
  companyLogo: text("company_logo"),
  industry: text("industry").notNull(),
  tokens: integer("tokens").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  badges: text("badges").notNull().default(""),
  productImage: text("productimage").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id),
  paymentId: text("payment_id").notNull(),
  tokens: integer("tokens").notNull(),
  amount: integer("amount").notNull(), // Amount in cents
  status: text("status").notNull(), // success, pending, failed
  createdAt: timestamp("created_at").defaultNow(),
});

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id),
  productId: uuid("product_id").references(() => products.id),
  conversation: json("conversation").notNull(), // Store messages, timestamps, roles etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  transactions: many(transactions),
  conversations: many(conversations),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  user: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
  conversations: many(conversations),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  user: one(users, {
    fields: [conversations.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [conversations.productId],
    references: [products.id],
  }),
  usages: many(usages)
}));

export const usages = pgTable("usages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id),
  conversationId: uuid("conversation_id").notNull().references(() => conversations.id),
  tokensUsed: integer("tokens_used").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usagesRelations = relations(usages, ({ one }) => ({
  user: one(users, {
    fields: [usages.userId],
    references: [users.id],
  }),
  conversation: one(conversations, {
    fields: [usages.conversationId],
    references: [conversations.id],
  }),
}));