import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { blogSchema } from '@/lib/validations';
import { ZodError } from 'zod';

async function getAuthUser(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return null;
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  return user;
}

async function isAdmin(userId: string) {
  const { data } = await supabaseAdmin.from('admins').select('id').eq('id', userId).single();
  return !!data;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Only increment views on public reads (no auth token)
    const token = request.headers.get('Authorization');
    if (!token) {
      await supabaseAdmin
        .from('blogs')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id);
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getAuthUser(request);
    if (!user || !(await isAdmin(user.id))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();
    const validated = blogSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .update({ ...validated, updated_at: new Date().toISOString() })
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getAuthUser(request);
    if (!user || !(await isAdmin(user.id))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;

    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('slug', slug);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
