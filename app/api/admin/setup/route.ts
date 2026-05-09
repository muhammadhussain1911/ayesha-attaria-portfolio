import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * POST /api/admin/setup
 * 
 * Adds a user to the admins table after signup.
 * This is called from the signup page after user creates account.
 * 
 * Request body:
 * {
 *   email: string // The email of the user to add as admin
 * }
 * 
 * Note: This endpoint must be called AFTER the user has signed up
 * but before they can use admin features.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Only allow setup for the authorized admin email
    const ALLOWED_ADMIN_EMAIL = "responsiblesecexpert@gmail.com";
    if (email.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: "Unauthorized email" },
        { status: 403 }
      );
    }

    // Get user from auth by email
    const { data: { users }, error: getUserError } = await supabaseAdmin.auth.admin.listUsers();

    if (getUserError) {
      console.error("Error listing users:", getUserError);
      return NextResponse.json(
        { error: "Failed to find user" },
        { status: 500 }
      );
    }

    const user = users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please sign up first." },
        { status: 404 }
      );
    }

    // Check if already in admins table
    const { data: existingAdmin, error: checkError } = await supabaseAdmin
      .from("admins")
      .select("id")
      .eq("id", user.id)
      .single();

    if (existingAdmin) {
      return NextResponse.json(
        { message: "User is already an admin", id: user.id },
        { status: 200 }
      );
    }

    // Add user to admins table
    const { data, error } = await supabaseAdmin
      .from("admins")
      .insert([
        {
          id: user.id,
          email: user.email,
          role: "admin",
        },
      ])
      .select();

    if (error) {
      console.error("Error adding admin:", error);
      return NextResponse.json(
        { error: error.message || "Failed to add admin" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Admin account setup successfully", admin: data[0] },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Admin setup error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
