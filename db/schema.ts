import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const qaLabDispatchLocks = sqliteTable("qa_lab_dispatch_locks", {
  key: text("key").primaryKey(),
  requestId: text("request_id").notNull(),
  dispatchedAt: integer("dispatched_at").notNull(),
});
