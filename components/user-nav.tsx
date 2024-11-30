import { createClient } from "@/utils/supabase/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components//ui/avatar";
import { signOutAction } from "@/app/actions";
import { getUserProfile, isUserAdmin } from "@/utils/supabase/queries";
import { getName, getNameInitials } from "@/utils/utils";
import Link from "next/link";
import { UserIcon } from "lucide-react";

export const UserNav = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="pl-2">
        <Button variant="outline">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    );
  }

  const userProfile = await getUserProfile(supabase, user.id);
  const userIsAdmin = await isUserAdmin(supabase, user.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {userProfile.first_name ? (
                getNameInitials(userProfile)
              ) : (
                <UserIcon />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="px-2 py-1 5 text-sm font-normal">
          <div className="flex flex-col space-y-1">
            {userProfile.first_name && (
              <p className="text-sm font-medium leading-none">
                {getName(userProfile)}
              </p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {userIsAdmin && (
          <>
            <DropdownMenuItem className="hover:bg-accent">
              <Link href="/admin/create-post">Create a Post</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-accent">
              <Link href="/admin/photos">Photos Admin</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem className="hover:bg-accent">
          <form action={signOutAction}>
            <Button
              variant="ghost"
              className="p-0 h-auto font-normal cursor-default hover:text-foreground hover:bg-accent-background"
              type="submit"
            >
              Sign Out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
