export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

type UserRole = "admin" | "user";

export interface Post {
  id: string;
  created_at: string;
  title: string;
  body: string;
  author: string;
}
