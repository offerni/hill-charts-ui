import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/app/lib/apolloProvider";
import Link from "next/link";

import { Session, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/_options";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hill charts",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession<{}, Session>(authOptions);
  const user = session?.user;

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <nav className="flex items-center justify-between p-3">
          {user?.image && (
            <Image
              src={user.image}
              alt={`${user.name || "user"}'s avatar`}
              width={40}
              height={40}
            />
          )}
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            <button type="button" className="border p-2 border-gray-500">
              {session ? "Sign out" : "Sign in"}
            </button>
          </Link>
        </nav>
        <main className="flex h-[calc(100%-4.5rem)] flex-col items-center justify-center">
          <ApolloWrapper>{children}</ApolloWrapper>
        </main>
      </body>
    </html>
  );
}
