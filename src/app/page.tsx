'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { blogPosts } from '@/lib/supabase-utils'
import { BlogPost } from '@/types/database'

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    const { data, error } = await blogPosts.getAll()
    
    if (error) {
      setError(error.message)
    } else {
      // Filter to show only published posts for non-authenticated users
      const filteredPosts = user ? (data || []) : (data || []).filter(post => post.published)
      setPosts(filteredPosts)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Simple Blog</h1>
            <nav className="flex space-x-4">
              {user ? (
                <>
                  <Link 
                    href="/auth" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    My Profile
                  </Link>
                  <Link 
                    href="/create-post" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Create Post
                  </Link>
                </>
              ) : (
                <Link 
                  href="/auth" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Admin Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
          <p className="text-gray-600">
            Discover interesting articles and insights from our authors.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error loading posts: {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Posts Yet</h3>
            <p className="text-gray-500 mb-4">Be the first to create a blog post!</p>
            {user && (
              <Link 
                href="/create-post"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Create Your First Post
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.content.substring(0, 200)}
                  {post.content.length > 200 && '...'}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Published on {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {post.author?.email && (
                      <span className="ml-2">
                        by {post.author.email.split('@')[0]}
                      </span>
                    )}
                  </span>
                  {!post.published && user && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      Draft
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
