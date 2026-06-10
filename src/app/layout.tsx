import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PROFILE } from "@/lib/profile";
import "./globals.css";
import "./github-markdown.css";
import "github-markdown-css/github-markdown-dark.css";

export const metadata: Metadata = {
  title: "Ccctw Ma",
  description: PROFILE.intro,
  metadataBase: new URL("https://ccctw-ma.github.io"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-200 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
