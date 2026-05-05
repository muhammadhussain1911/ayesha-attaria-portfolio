"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Lock, Mail, AlertCircle, CheckCircle, Loader } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, user, loading, isAdmin, mounted } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mounted && !loading && user && isAdmin) {
      router.push("/admin");
    }
  }, [user, loading, isAdmin, router, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(email, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-off-white">
        <Loader className="w-12 h-12 animate-spin text-[#4ddcd3]" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-off-white px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#4ddcd3]/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="w-full max-w-md glass-card p-8 md:p-10 text-center space-y-6 relative z-10">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
          <h1 className="text-3xl font-serif font-bold text-black">
            Account Created
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Your admin account has been created successfully. Please check your
            email to confirm your account.
          </p>
          <a
            href="/admin/login"
            className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-[#4ddcd3] hover:text-black transition-all"
          >
            Go to Login
          </a>
        </div>
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
          <h1 className="text-3xl font-serif font-bold text-black">
            Admin Signup
          </h1>
          <p className="text-gray-600 mt-2">Create your admin account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 md:p-10 space-y-6"
        >
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 bg-off-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Only authorized email can signup
            </p>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 bg-off-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 bg-off-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
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
                Creating Account...
              </>
            ) : (
              "Create Admin Account"
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/admin/login"
              className="text-[#4ddcd3] hover:text-[#3db5a1] font-medium"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
