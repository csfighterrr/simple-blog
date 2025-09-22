// Database types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
  updated_at: string
  published: boolean
  author?: {
    id: string
    email: string
  }
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
}

export interface PostForm {
  title: string
  content: string
}