import { UserProfile } from "@/types/db.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export const getUserProfile = cache(
  async (supabase: SupabaseClient, userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return profile as UserProfile;
  }
);

export const isUserAdmin = cache(
  async (supabase: SupabaseClient, userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return (profile as UserProfile).role === "admin";
  }
);
