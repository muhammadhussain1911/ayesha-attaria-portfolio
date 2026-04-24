"use client";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/app/context/AuthContext";
import { Analytics } from "@vercel/analytics/next";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="bottom-center" />
      {process.env.NODE_ENV === "production" && <Analytics />}
    </AuthProvider>
  );
}
