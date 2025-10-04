import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/posts/[id] - Get post by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = params.id;
  if (!postId) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  // Query post by id
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(post, { status: 200 });
}
