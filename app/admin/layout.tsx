"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Loader } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, isAdmin, mounted } = useAuth();

  // Auth pages that don't require login
  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/signup" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password";

  useEffect(() => {
    // Only protect non-auth pages after hydration is complete
    if (mounted && !isAuthPage && (!user || !isAdmin)) {
      router.push("/admin/login");
    }
  }, [user, isAdmin, router, isAuthPage, mounted]);

  // Show loading state only for protected pages and only after mount
  if (mounted && !isAuthPage && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  // For protected pages, ensure user is authenticated
  if (mounted && !isAuthPage && (!user || !isAdmin)) {
    return null;
  }

  // For auth pages, render immediately (no auth check needed)
  if (isAuthPage) {
    return <>{children}</>;
  }

  // For protected pages with valid auth, render after mount
  if (mounted) {
    return <>{children}</>;
  }

  // During hydration on protected pages, render nothing to avoid mismatch
  return null;
}
