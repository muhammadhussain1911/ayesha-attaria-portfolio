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
  const { user, loading, isAdmin } = useAuth();

  // Auth pages that don't require login
  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/signup" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password";

  useEffect(() => {
    // Only protect non-auth pages
    if (!isAuthPage && !loading && (!user || !isAdmin)) {
      router.push("/admin/login");
    }
  }, [user, loading, isAdmin, router, isAuthPage]);

  if (!isAuthPage && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!isAuthPage && (!user || !isAdmin)) {
    return null;
  }

  return <>{children}</>;
}
