"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ui/theme-provider";

export function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ThemeProvider>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
