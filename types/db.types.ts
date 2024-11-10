export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

type UserRole = "admin" | "user";
