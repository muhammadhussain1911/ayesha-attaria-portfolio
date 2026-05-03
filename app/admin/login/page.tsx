"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Lock, Mail, AlertCircle, Loader } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, loading, isAdmin, mounted } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mounted && !loading && user && isAdmin) {
      router.push("/admin");
    }
  }, [user, loading, isAdmin, router, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signIn(email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader className="w-12 h-12 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-off-white px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#4ddcd3]/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#4ddcd3]/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#4ddcd3]" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-black">Admin Login</h1>
          <p className="text-gray-600 mt-2">
            Secure access to the portfolio admin panel
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 md:p-10 space-y-6"
        >
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                required
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 bg-off-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent disabled:bg-gray-50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 bg-off-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent disabled:bg-gray-50 transition-all"
              />
            </div>
            <div className="text-right mt-1">
              <a
                href="/admin/forgot-password"
                className="text-xs text-[#4ddcd3] hover:text-[#3db5a1] font-medium"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-black hover:bg-[#4ddcd3] disabled:bg-gray-400 text-white hover:text-black font-medium py-3 rounded-xl transition-all duration-300 shadow-soft-lg hover:-translate-y-1 hover:shadow-soft-xl"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
