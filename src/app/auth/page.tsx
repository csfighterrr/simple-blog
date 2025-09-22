'use client'

import { useAuth } from '@/contexts/AuthContext'
import LoginForm from '@/components/LoginForm'
import UserProfile from '@/components/UserProfile'
import BlogPostList from '@/components/BlogPostList'

export default function AuthPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {user ? (
          <div className="space-y-8">
            <UserProfile />
            <BlogPostList />
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
}