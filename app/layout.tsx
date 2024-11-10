import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { UserNav } from "@/components/user-nav";
import { Toaster } from "@/components/ui/sonner";

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
              <a className="break-words" href="/">
                Friends of Amy Breen
              </a>
              <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
                  <a className="block" href="/">
                    Updates
                  </a>
                  {/* <a className="block" href="/">
                    Memories
                  </a> */}
                </div>
                <UserNav />
                <div className="mr-5 flex items-center">
                  <ThemeSwitcher />
                </div>
                <div className="sm:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-8 w-8 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
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
