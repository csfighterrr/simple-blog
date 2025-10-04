import { NextRequest } from 'next/server'
import { supabase } from './supabase'

export interface AuthResult {
  success: boolean
  user?: any
  error?: string
}

export interface AdminAuthResult extends AuthResult {
  isAdmin?: boolean
}

/**
 * Extract bearer token from Authorization header
 */
export function extractBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  return authHeader.substring(7) // Remove 'Bearer ' prefix
}

/**
 * Verify admin authentication from request
 */
export async function verifyAdminAuth(request: NextRequest): Promise<AdminAuthResult> {
  try {
    const token = extractBearerToken(request)
    
    if (!token) {
      return {
        success: false,
        error: 'Authorization header with Bearer token is required'
      }
    }
    
    // Verify the token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return {
        success: false,
        error: 'Invalid or expired token'
      }
    }
    
    // Check if user has admin role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    if (profileError || !profile) {
      return {
        success: false,
        error: 'User profile not found'
      }
    }
    
    const isAdmin = profile.role === 'admin'
    
    if (!isAdmin) {
      return {
        success: false,
        isAdmin: false,
        error: 'Admin access required'
      }
    }
    
    return {
      success: true,
      user,
      isAdmin: true
    }
  } catch (error) {
    console.error('Admin auth verification error:', error)
    return {
      success: false,
      error: 'Authentication verification failed'
    }
  }
}

/**
 * Verify regular user authentication (non-admin)
 */
export async function verifyUserAuth(request: NextRequest): Promise<AuthResult> {
  try {
    const token = extractBearerToken(request)
    
    if (!token) {
      return {
        success: false,
        error: 'Authorization header with Bearer token is required'
      }
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return {
        success: false,
        error: 'Invalid or expired token'
      }
    }
    
    return {
      success: true,
      user
    }
  } catch (error) {
    console.error('User auth verification error:', error)
    return {
      success: false,
      error: 'Authentication verification failed'
    }
  }
}