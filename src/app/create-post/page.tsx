'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { blogPosts } from '@/lib/supabase-utils'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { user } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to create posts.</p>
          <Link 
            href="/auth"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error } = await blogPosts.create({
        title: title.trim(),
        content: content.trim(),
        author_id: user.id,
        published
      })
      
      if (error) {
        setError(error.message)
      } else {
        // Redirect to home page after successful creation
        router.push('/')
      }
    } catch (err: any) {
      setError('An unexpected error occurred')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
            <nav className="flex space-x-4">
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Home
              </Link>
              <Link 
                href="/auth" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                My Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Post Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Post Content *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="published"
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                Publish immediately (if unchecked, post will be saved as draft)
              </label>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Link
                href="/"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : published ? 'Publish Post' : 'Save as Draft'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}