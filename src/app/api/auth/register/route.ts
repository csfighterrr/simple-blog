import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST /api/auth/register - User registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, display_name } = body
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    if (!display_name) {
      return NextResponse.json(
        { error: 'Display name is required' },
        { status: 400 }
      )
    }
    
    // Register the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name,
        }
      }
    })
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    // If user is created, also create profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([
          {
            id: data.user.id,
            display_name,
          }
        ])
      
      if (profileError) {
        console.error('Profile creation error:', profileError)
        // Continue anyway as the user was created
      }
    }
    
    return NextResponse.json({
      user: data.user,
      session: data.session,
      message: 'Registration successful. Please check your email for verification.'
    }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}