// src/app/%28home%29/client.tsx
"use client";

import { trpc } from "@/trpc/client";
export function PageClient() {
  const [data] = trpc.hello.useSuspenseQuery({ text: "VedaVerse" });

  return (
  <div>Page Client Says:{data.greeting}</div>
  );
}