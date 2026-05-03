"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import {
  Lock,
  Mail,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowLeft,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-off-white px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#4ddcd3]/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="w-full max-w-md glass-card p-8 md:p-10 text-center space-y-6 relative z-10">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
          <h1 className="text-3xl font-serif font-bold text-black">Check your email</h1>
          <p className="text-gray-600 leading-relaxed">
            A password reset link has been sent to{" "}
            <span className="font-bold text-[#4ddcd3]">{email}</span>. Click
            the link in the email to set a new password.
          </p>
          <a
            href="/admin/login"
            className="inline-flex items-center gap-2 text-[#4ddcd3] hover:text-[#3db5a1] font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
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
          <h1 className="text-3xl font-serif font-bold text-black">Forgot Password</h1>
          <p className="text-gray-600 mt-2">
            Enter your email to receive a reset link
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-black hover:bg-[#4ddcd3] disabled:bg-gray-400 text-white hover:text-black font-medium py-3 rounded-xl transition-all duration-300 shadow-soft-lg hover:-translate-y-1 hover:shadow-soft-xl"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <a
            href="/admin/login"
            className="inline-flex items-center gap-2 text-[#4ddcd3] hover:text-[#3db5a1] font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
