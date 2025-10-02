// Database types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  website: string | null
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  author_id: string | null
  created_at: string | null
  updated_at: string | null
  published: boolean | null
  author?: {
    id: string
    email: string
  }
  profile?: Profile
  profiles?: {
    id: string
    display_name: string | null
    avatar_url: string | null
  } | null
}

export interface Comment {
  id: string
  post_id: string
  author_id: string
  content: string
  created_at: string
  updated_at: string
}

// API response types
export interface ApiResponse<T> {
  data: T | null
  error: Error | null
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface SignUpForm {
  email: string
  password: string
  confirmPassword: string
  displayName?: string
}

export interface PostForm {
  title: string
  content: string
}