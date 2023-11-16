import "../globals.css";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Connectly",
  image: "/favicon.png",
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
        <body>
          <Navbar id={current?.id} email={current?.emailAddresses[0].emailAddress} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};
