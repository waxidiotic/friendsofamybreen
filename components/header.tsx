import Link from "next/link";
import { Flower2Icon } from "lucide-react";
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
              className="flex space-x-4 items-center font-semibold text-primary"
            >
              <Flower2Icon />
              <div className="text-xl">Friends of Amy Breen</div>
            </Link>
          </div>
          <nav
            aria-label="Main navigation"
            className="flex space-x-4 items-center text-muted-foreground transition-colors"
          >
            <Link
              href="/"
              className="hidden sm:block hover:bg-muted hover:text-foreground rounded-md px-2 py-1"
            >
              Updates
            </Link>
            <Link
              href="/guestbook"
              className="hover:bg-muted hover:text-foreground rounded-md px-2 py-1"
            >
              Guestbook
            </Link>
            <Link
              href="/photos"
              className="hover:bg-muted hover:text-foreground rounded-md px-2 py-1"
            >
              Photos
            </Link>
            <ThemeSwitcher />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
