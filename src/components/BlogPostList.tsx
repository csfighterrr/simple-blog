'use client'

import { useState, useEffect } from 'react'
import { blogPosts } from '@/lib/supabase-utils'
import { BlogPost } from '@/types/database'

export default function BlogPostList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    const { data, error } = await blogPosts.getAll()
    
    if (error) {
      setError(error.message)
    } else {
      setPosts(data || [])
    }
    
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading posts: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found. Create your first post!</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white p-6 rounded-lg shadow-md border">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              <div className="text-sm text-gray-500">
                Published on {new Date(post.created_at).toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}