import React from "react";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-[60px]">
      <article className="px-8 mx-auto max-w-2xl overflow-hidden">{children}</article>
    </main>
  );
}
