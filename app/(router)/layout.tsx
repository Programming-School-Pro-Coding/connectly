import "../globals.css";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Connectly",
  description: "Epic Shop for best prices",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const current = await currentUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon.png"
          />
        </head>
        <body>
          <Navbar
            id={String(current?.id)}
            email={String(current?.emailAddresses[0].emailAddress)}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
