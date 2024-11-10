import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { isUserAdmin } from "@/utils/supabase/queries";

export const CreatePostButton = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const userIsAdmin = await isUserAdmin(supabase, user.id);

  if (userIsAdmin) {
    return (
      <Button asChild size="sm" variant={"default"}>
        <Link href="/admin/create-post">Create Post</Link>
      </Button>
    );
  }

  return null;
};
