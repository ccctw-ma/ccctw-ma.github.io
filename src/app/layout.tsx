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
    <html lang="en" data-lang="en" data-theme="light">
      <body className="min-h-screen antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
