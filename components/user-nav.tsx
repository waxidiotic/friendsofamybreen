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
import { getUserProfile } from "@/utils/supabase/queries";
import { getName, getNameInitials } from "@/utils/utils";
import Link from "next/link";
import { User } from "lucide-react";

export const UserNav = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  const userProfile = await getUserProfile(supabase, user.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {userProfile.first_name ? getNameInitials(userProfile) : <User />}
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
        {/* <DropdownMenuItem className="hover:bg-accent">Profile</DropdownMenuItem> */}
        <DropdownMenuSeparator />
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
