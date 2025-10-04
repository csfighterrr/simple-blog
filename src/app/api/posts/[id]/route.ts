import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/posts/[id] - Fetch a specific post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id
    
    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }
    
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id(id, display_name, avatar_url)
      `)
      .eq('id', postId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }
      
      console.error('Error fetching post:', error)
      return NextResponse.json(
        { error: 'Failed to fetch post', details: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ post })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/posts/[id] - Update a specific post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id
    
    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    const { title, content, published, excerpt, reading_time } = body
    
    // Build update object with only provided fields
    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (content !== undefined) {
      updateData.content = content
      // Recalculate reading time if content is updated
      updateData.reading_time = reading_time || Math.ceil(content.split(' ').length / 200)
      // Update excerpt if not provided
      if (!excerpt) {
        updateData.excerpt = content.substring(0, 150) + '...'
      }
    }
    if (published !== undefined) updateData.published = published
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (reading_time !== undefined) updateData.reading_time = reading_time
    
    // Add updated timestamp
    updateData.updated_at = new Date().toISOString()
    
    const { data: post, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', postId)
      .select(`
        *,
        profiles:author_id(id, display_name, avatar_url)
      `)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }
      
      console.error('Error updating post:', error)
      return NextResponse.json(
        { error: 'Failed to update post', details: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      post,
      message: 'Post updated successfully'
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[id] - Delete a specific post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id
    
    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }
    
    // First check if post exists
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('id, title')
      .eq('id', postId)
      .single()
    
    if (fetchError || !existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    // Delete the post
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)
    
    if (error) {
      console.error('Error deleting post:', error)
      return NextResponse.json(
        { error: 'Failed to delete post', details: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      message: 'Post deleted successfully',
      deletedPost: existingPost
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}