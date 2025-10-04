import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/users/[id] - Get user profile
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        id,
        display_name,
        avatar_url,
        bio,
        website,
        created_at,
        updated_at
      `)
      .eq('id', userId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      
      console.error('Error fetching user profile:', error)
      return NextResponse.json(
        { error: 'Failed to fetch user profile', details: error.message },
        { status: 500 }
      )
    }
    
    // Get user's post count
    const { count: postCount, error: countError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId)
      .eq('published', true)
    
    return NextResponse.json({
      profile: profile ? {
        id: profile.id,
        display_name: profile.display_name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        website: profile.website,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
        post_count: postCount || 0
      } : null
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/users/[id] - Update user profile
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    const { display_name, bio, website, avatar_url } = body
    
    // Build update object with only provided fields
    const updateData: any = {}
    if (display_name !== undefined) updateData.display_name = display_name
    if (bio !== undefined) updateData.bio = bio
    if (website !== undefined) updateData.website = website
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url
    
    // Add updated timestamp
    updateData.updated_at = new Date().toISOString()
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId)
      .select(`
        id,
        display_name,
        avatar_url,
        bio,
        website,
        created_at,
        updated_at
      `)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      
      console.error('Error updating user profile:', error)
      return NextResponse.json(
        { error: 'Failed to update user profile', details: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      profile,
      message: 'Profile updated successfully'
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}