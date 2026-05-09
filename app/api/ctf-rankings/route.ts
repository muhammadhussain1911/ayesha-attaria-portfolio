import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { ctfRankingSchema } from "@/lib/validations";
import { ZodError } from "zod";

async function isAdmin(userId: string) {
  const { data } = await supabaseAdmin
    .from("admins")
    .select("id")
    .eq("id", userId)
    .single();
  return !!data;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const admin = searchParams.get("admin") === "true";

    const client = admin ? supabaseAdmin : supabase;
    const { data, error } = await client
      .from("ctf_rankings")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get auth token
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - no token provided" },
        { status: 401 },
      );
    }

    // Verify token and get user
    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized - invalid token" },
        { status: 401 },
      );
    }

    // Check admin status
    if (!(await isAdmin(user.id))) {
      return NextResponse.json(
        { error: "Forbidden - admin access required" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const validated = ctfRankingSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from("ctf_rankings")
      .insert([{ ...validated, created_at: new Date().toISOString() }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
