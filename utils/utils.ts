import { UserProfile } from "@/types";
import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function getName(userProfile: UserProfile) {
  return `${userProfile.first_name} ${userProfile.last_name || ""}`;
}

export function getNameInitials(userProfile: UserProfile) {
  return `${(userProfile.first_name || "")[0]}${(userProfile.last_name || "")[0]}`.toUpperCase();
}

export function formatTimestamp(timestamp: string) {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Format the date in a human-readable format
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
