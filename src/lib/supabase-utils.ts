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
  // Get all blog posts with author profiles (trying automatic relationship detection)
  getAll: async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles(
          id,
          display_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Get a single blog post by ID (trying automatic relationship detection)
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles(
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

  // Create a new blog post
  create: async (post: { title: string; content: string; author_id: string; published?: boolean; image_url?: string }) => {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
    return { data, error }
  },

  // Update a blog post
  update: async (id: string, updates: Partial<{ title: string; content: string; published: boolean; image_url: string }>) => {
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

// Storage functions for file uploads
export const storage = {
  // Upload an image to Supabase storage
  uploadImage: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('post-images')
      .upload(path, file)
    return { data, error }
  },

  // Get public URL for an uploaded image
  getPublicUrl: (path: string) => {
    const { data } = supabase.storage
      .from('post-images')
      .getPublicUrl(path)
    return data.publicUrl
  },

  // Delete an image from storage
  deleteImage: async (path: string) => {
    const { error } = await supabase.storage
      .from('post-images')
      .remove([path])
    return { error }
  }
}
