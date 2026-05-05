"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Lock, AlertCircle, CheckCircle, Loader } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updatePassword, user, loading, mounted } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingToken, setIsProcessingToken] = useState(true);

  // Handle the recovery token from Supabase
  useEffect(() => {
    const handleRecoveryToken = async () => {
      try {
        // Check if there's a token in the URL hash (Supabase recovery links)
        const hash = window.location.hash;

        if (hash && hash.includes("access_token")) {
          // Let Supabase client process the hash automatically via onAuthStateChange
          // The token should be exchanged by the Supabase auth listener
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Give time for auth state to update
        }

        setIsProcessingToken(false);
      } catch (err) {
        console.error("Error processing recovery token:", err);
        setIsProcessingToken(false);
      }
    };

    handleRecoveryToken();
  }, []);

  // Validate session for recovery flow
  useEffect(() => {
    if (!isProcessingToken && mounted && !loading && !user) {
      // No session — the reset link may be invalid or expired
      setError("Invalid or expired reset link. Please request a new one.");
    }
  }, [loading, user, mounted, isProcessingToken]);

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
      await updatePassword(password);
      setSuccess(true);
      setTimeout(() => router.push("/admin"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isProcessingToken || loading) {
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
            Password Updated
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Your password has been changed. Redirecting to admin panel...
          </p>
        </div>
      </div>
    );
  }

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
      await updatePassword(password);
      setSuccess(true);
      setTimeout(() => router.push("/admin"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isProcessingToken || loading) {
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
            Password Updated
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Your password has been changed. Redirecting to admin panel...
          </p>
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
            Set New Password
          </h1>
          <p className="text-gray-600 mt-2">
            Choose a strong password for your admin account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 md:p-10 space-y-6"
        >
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-red-700 font-medium">{error}</p>
                {error.includes("Invalid or expired") && (
                  <a
                    href="/admin/forgot-password"
                    className="text-red-600 underline mt-2 inline-block"
                  >
                    Request a new link
                  </a>
                )}
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
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
                disabled={isSubmitting || error.includes("Invalid")}
                className="w-full pl-10 pr-4 py-3 bg-off-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">At least 8 characters</p>
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
                disabled={isSubmitting || error.includes("Invalid")}
                className="w-full pl-10 pr-4 py-3 bg-off-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ddcd3] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || error.includes("Invalid")}
            className="w-full flex items-center justify-center gap-2 bg-black hover:bg-[#4ddcd3] disabled:bg-gray-400 text-white hover:text-black font-medium py-3 rounded-xl transition-all duration-300 shadow-soft-lg hover:-translate-y-1 hover:shadow-soft-xl"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            Remembered your password?{" "}
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
