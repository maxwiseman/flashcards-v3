"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";

export function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <Toaster />
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
