import Link from "next/link";
import { Flower2Icon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { ThemeSwitcher } from "./theme-switcher";

export default async function Header() {
  return (
    <header className="bg-background w-full">
      <div className="mx-auto  w-full">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              aria-label="Home"
              className="flex space-x-4 items-center font-semibold"
            >
              <Flower2Icon />
              <div className="text-xl">Friends of Amy Breen</div>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <nav className="flex space-x-4 items-center">
              <Button asChild variant="ghost">
                <Link
                  href="/updates"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Updates
                </Link>
              </Button>
              {/* <Button asChild variant="ghost">
                <Link
                  href="/memories"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Memories
                </Link>
              </Button> */}
              <ThemeSwitcher />
              <UserNav />
            </nav>
          </div>
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
