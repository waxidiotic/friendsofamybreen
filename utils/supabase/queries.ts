import { UserProfile, Posts, Image } from "@/types";
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

export const getPosts = cache(async (supabase: SupabaseClient) => {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Posts>();

  return posts;
});

export const getPublicImages = cache(async (supabase: SupabaseClient) => {
  const { data: images } = await supabase
    .from("images")
    .select("*")
    .eq("visibility", true)
    .order("created_at", { ascending: false })
    .returns<Image[]>();

  return images;
});

export const getAllImages = cache(async (supabase: SupabaseClient) => {
  const { data: images } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Image[]>();

  return images;
});
