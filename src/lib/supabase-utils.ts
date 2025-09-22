import { supabase } from './supabase'

// Authentication functions
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
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
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database functions for blog posts
export const blogPosts = {
  // Get all blog posts
  getAll: async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Get a single blog post by ID
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
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
  delete: async (id: string) => {
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
  select: async (table: string, columns: string = '*', filters?: Record<string, any>) => {
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
  insert: async (table: string, data: Record<string, any>) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select()
    return { data: result, error }
  },

  // Generic update function
  update: async (table: string, id: string, updates: Record<string, any>) => {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  // Generic delete function
  delete: async (table: string, id: string) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    return { error }
  }
}