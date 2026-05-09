"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  mounted: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Helper function to ensure user is in admins table (auto-setup)
  const ensureAdminSetup = async (userEmail: string | undefined) => {
    if (!userEmail) return;

    try {
      // Call the admin setup endpoint to ensure user is in admins table
      const response = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) {
        // If setup fails, it's not critical - admin might already be in table
        console.debug("Admin setup response:", response.status);
      }
    } catch (error) {
      // Silently fail - don't interrupt auth flow
      console.debug("Admin setup fetch error:", error);
    }
  };

  useEffect(() => {
    // Set mounted to true to indicate hydration is complete
    setMounted(true);

    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user || null);
        if (session?.user) {
          // Auto-setup admin if authorized email
          await ensureAdminSetup(session.user.email);

          try {
            const { data } = await supabase
              .from("admins")
              .select("id")
              .eq("id", session.user.id)
              .single();
            setIsAdmin(!!data);
          } catch (error) {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
        // Silently fail - user will be redirected on protected routes
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        setSession(session);
        setUser(session?.user || null);
        if (session?.user) {
          // Auto-setup admin if authorized email
          await ensureAdminSetup(session.user.email);

          try {
            const { data } = await supabase
              .from("admins")
              .select("id")
              .eq("id", session.user.id)
              .single();
            setIsAdmin(!!data);
          } catch (error) {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    // Only allow signup for the specific admin email
    const ALLOWED_ADMIN_EMAIL = "responsiblesecexpert@gmail.com";

    if (email.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
      throw new Error(
        "Signup is restricted. Only the authorized admin email can create an account.",
      );
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://www.ayeshaattaria.site/admin/login",
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      // Still clear local state even if sign out fails
      setUser(null);
      setSession(null);
      setIsAdmin(false);
    }
  };

  const resetPassword = async (email: string) => {
    // Use the production domain explicitly for recovery links
    const baseUrl = "https://www.ayeshaattaria.site";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/admin/reset-password`,
    });
    if (error) throw error;
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        mounted,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
