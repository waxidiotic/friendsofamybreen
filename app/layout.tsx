import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { UserNav } from "@/components/user-nav";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { CreatePost } from "@/components/create-post";
import { CreatePostButton } from "@/components/create-post-button";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Friends of Amy Breen",
  description: "Updates and memories of Amy Breen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground pl-[calc(100vw-100%)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <header className="flex items-center w-full justify-between py-10">
              <Link className="break-words" href="/">
                Friends of Amy Breen
              </Link>
              <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
                  <Link className="block" href="/">
                    Updates
                  </Link>
                  {}
                  {/* <a className="block" href="/">
                    Memories
                  </a> */}
                  <CreatePostButton />
                </div>
                <UserNav />
                <div className="mr-5 flex items-center">
                  <ThemeSwitcher />
                </div>
              </div>
            </header>
            {children}
          </section>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
