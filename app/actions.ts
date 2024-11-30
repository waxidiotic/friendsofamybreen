"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreatePostFormValues } from "@/components/create-post";
import { revalidatePath } from "next/cache";
import { Image } from "@/types";
import { PhotoEditFormValues } from "@/components/photo-edit-sheet";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
  return revalidatePath("/");
};

/** DB Actions */
export const createPostAction = async (formData: CreatePostFormValues) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const response = await supabase
    .from("posts")
    .insert({
      title: formData.title,
      body: formData.body,
      body_json: formData.body_json,
      author: user?.id || "",
    })
    .select();

  if (response.error) {
    throw new Error(response.error.message);
  }
};

export const createImagesAction = async (imageData: Image) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const response = await supabase.from("images").insert({
    asset_id: imageData.asset_id,
    public_id: imageData.public_id,
    width: imageData.width,
    height: imageData.height,
    format: imageData.format,
    resource_type: imageData.resource_type,
    type: imageData.type,
    url: imageData.url,
    secure_url: imageData.secure_url,
    original_filename: imageData.original_filename,
    uploaded_to_cloudinary_at: imageData.created_at,
    uploaded_by: user?.id || "",
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return redirect("/photos");
};

export interface UpdateImageDetailsOptions {
  id: string;
  data: PhotoEditFormValues;
}

export const updateImageDetailsAction = async ({
  id,
  data,
}: UpdateImageDetailsOptions) => {
  const supabase = await createClient();

  const response = await supabase
    .from("images")
    .update({ display_name: data.description, visibility: data.visibility })
    .eq("public_id", id)
    .select();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return revalidatePath("/admin/photos");
};

export const deleteImageAction = async (id: string) => {
  const supabase = await createClient();

  const response = await supabase.from("images").delete().eq("public_id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return revalidatePath("/admin/photos");
};
