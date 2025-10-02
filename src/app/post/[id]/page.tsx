'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, User, Edit } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { blogPosts } from '@/lib/supabase-utils'
import { BlogPost } from '@/types/database'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PostPage() {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const params = useParams()
  const postId = params.id as string

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      const { data, error } = await blogPosts.getById(postId)
      
      if (error) {
        setError(error.message)
      } else {
        setPost(data as BlogPost)
      }
      
      setLoading(false)
    }

    if (postId) {
      loadPost()
    }
  }, [postId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorName = (email?: string) => {
    return email ? email.split('@')[0] : 'Anonymous';
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

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

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-16">
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-4 rounded-lg max-w-2xl mx-auto">
              <h3 className="font-semibold mb-1">Post Not Found</h3>
              <p>{error || 'The requested post could not be found.'}</p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 mt-4 text-accent hover:text-accent/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
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
        {/* Back Navigation */}
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Posts
            </Link>
            
            {user && post && user.id === post.author_id && (
              <Link
                href={`/edit-post/${postId}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit Post
              </Link>
            )}
          </div>
        </div>

        {/* Article Header */}
        <article className="container mx-auto px-4 lg:px-8 pb-16">
          <header className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{getAuthorName(post.author?.email)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{getReadingTime(post.content)} min read</span>
                </div>
                {!post.published && (
                  <span className="bg-warning-amber/20 text-warning-amber px-3 py-1 rounded-full text-sm font-medium">
                    Draft
                  </span>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {post.image_url ? (
              <div className="aspect-video rounded-lg mb-8 overflow-hidden relative">
                <Image 
                  src={post.image_url} 
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg mb-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-accent/50 rounded-full"></div>
                  </div>
                  <p className="text-muted-foreground">No Featured Image</p>
                </div>
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto prose prose-lg prose-neutral dark:prose-invert">
            <div className="whitespace-pre-wrap leading-relaxed text-foreground">
              {post.content}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="max-w-3xl mx-auto mt-16 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold mb-2">About the Author</h3>
                <p className="text-muted-foreground">
                  Written by {getAuthorName(post.author?.email)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Last updated: {formatDate(post.updated_at || post.created_at)}
                </p>
              </div>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  )
}