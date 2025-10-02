'use client'

import { useAuth } from '@/contexts/AuthContext'
import AuthForm from '@/components/AuthForm'
import UserProfile from '@/components/UserProfile'
import BlogPostList from '@/components/BlogPostList'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AuthPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-16">
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          {user ? (
            <div className="space-y-8 lg:space-y-12">
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage your profile and blog posts
                </p>
              </div>
              <UserProfile />
              <BlogPostList />
            </div>
          ) : (
            <div className="max-w-md mx-auto py-12">
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
                  Welcome to Simple Blog
                </h1>
                <p className="text-muted-foreground">
                  Sign in to access your dashboard or join our community
                </p>
              </div>
              <AuthForm />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}