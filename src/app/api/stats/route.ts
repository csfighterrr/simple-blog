import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/stats - Get blog statistics
export async function GET(request: NextRequest) {
  try {
    // Get total posts count
    const { count: totalPosts, error: postsError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
    
    // Get published posts count
    const { count: publishedPosts, error: publishedError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('published', true)
    
    // Get total users count
    const { count: totalUsers, error: usersError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
    
    // Get recent posts (last 5)
    const { data: recentPosts, error: recentError } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        created_at,
        published,
        profiles:author_id(id, display_name)
      `)
      .order('created_at', { ascending: false })
      .limit(5)
    
    if (postsError || publishedError || usersError || recentError) {
      const errors = [postsError, publishedError, usersError, recentError].filter(Boolean)
      console.error('Error fetching stats:', errors)
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      stats: {
        totalPosts: totalPosts || 0,
        publishedPosts: publishedPosts || 0,
        draftPosts: (totalPosts || 0) - (publishedPosts || 0),
        totalUsers: totalUsers || 0,
      },
      recentPosts: recentPosts || []
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}