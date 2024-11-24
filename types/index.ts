import { Database as DbDatabase } from "./db.types";

export type Database = DbDatabase;
export type UserProfile = DbDatabase["public"]["Tables"]["profiles"]["Row"];
export type Post = DbDatabase["public"]["Tables"]["posts"]["Row"];
export type Posts = Post[];
export type Image = DbDatabase["public"]["Tables"]["images"]["Row"];
