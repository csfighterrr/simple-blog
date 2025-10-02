import { supabase } from './supabase'
import { Session } from '@supabase/supabase-js'

// Authentication functions
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string, displayName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName || email.split('@')[0]
        }
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Profile functions
export const profiles = {
  // Get profile by user ID
  getById: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  // Update profile
  update: async (userId: string, updates: Partial<{ display_name: string; bio: string; avatar_url: string; website: string }>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
    return { data, error }
  }
}

// Database functions for blog posts
export const blogPosts = {
  // Get all blog posts with author profiles (using proper foreign key relationship)
  getAll: async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles!posts_author_id_profiles_fkey(
          id,
          display_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Fallback method using separate queries (use this if the foreign key approach doesn't work)
  getAllFallback: async () => {
    // First get all posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (postsError) {
      return { data: null, error: postsError }
    }

    if (!posts || posts.length === 0) {
      return { data: [], error: null }
    }

    // Get all unique author IDs
    const authorIds = [...new Set(posts.map(post => post.author_id))]

    // Get all profiles for these authors
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, display_name, avatar_url')
      .in('id', authorIds)

    if (profilesError) {
      return { data: null, error: profilesError }
    }

    // Create a map of profiles by ID for quick lookup
    const profileMap = new Map()
    profiles?.forEach(profile => {
      profileMap.set(profile.id, profile)
    })

    // Combine posts with their author profiles
    const postsWithProfiles = posts.map(post => ({
      ...post,
      profiles: profileMap.get(post.author_id) || null
    }))

    return { data: postsWithProfiles, error: null }
  },

  // Get a single blog post by ID (using proper foreign key relationship)
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles!posts_author_id_profiles_fkey(
          id,
          display_name,
          avatar_url,
          bio
        )
      `)
      .eq('id', id)
      .single()
    return { data, error }
  },

  // Fallback method for getById using separate queries
  getByIdFallback: async (id: string) => {
    // First get the post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (postError) {
      return { data: null, error: postError }
    }

    if (!post) {
      return { data: null, error: null }
    }

    // Get the author's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, display_name, avatar_url, bio')
      .eq('id', post.author_id)
      .single()

    if (profileError) {
      return { data: null, error: profileError }
    }

    // Combine post with author profile
    const postWithProfile = {
      ...post,
      profiles: profile || null
    }

    return { data: postWithProfile, error: null }
  },

  // Create a new blog post
  create: async (post: { title: string; content: string; author_id: string; published?: boolean }) => {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
    return { data, error }
  },

  // Update a blog post
  update: async (id: string, updates: Partial<{ title: string; content: string; published: boolean }>) => {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  // Delete a blog post
  remove: async (id: string) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
    return { error }
  }
}

// Generic database functions
export const database = {
  // Generic select function
  select: async (table: string, columns: string = '*', filters?: Record<string, unknown>) => {
    let query = supabase.from(table).select(columns)
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }
    
    const { data, error } = await query
    return { data, error }
  },

  // Generic insert function
  insert: async (table: string, data: Record<string, unknown>) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select()
    return { data: result, error }
  },

  // Generic update function
  update: async (table: string, id: string, updates: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  // Generic delete function
  remove: async (table: string, id: string) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    return { error }
  }
}