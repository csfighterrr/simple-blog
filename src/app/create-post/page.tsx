'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { blogPosts } from '@/lib/supabase-utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import ImageUpload from '@/components/ImageUpload'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { user } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-16">
            <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-card text-center">
              <h2 className="text-2xl font-heading font-bold mb-4">Access Denied</h2>
              <p className="text-muted-foreground mb-6">You need to be logged in to create posts.</p>
              <Link 
                href="/auth"
                className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-semibold"
              >
                Sign In
              </Link>
            </div>
          </div>
        </main>
        <Footer />
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
        published,
        image_url: imageUrl || undefined
      })
      
      if (error) {
        setError(error.message)
      } else {
        // Redirect to home page after successful creation
        router.push('/')
      }
    } catch {
      setError('An unexpected error occurred')
    }
    
    setLoading(false)
  }

  const handleImageUpload = (url: string) => {
    setImageUrl(url)
  }

  const handleImageRemove = () => {
    setImageUrl('')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
                Create New Post
              </h1>
              <p className="text-muted-foreground">
                Share your thoughts and ideas with the world
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-card">
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-4 rounded-lg">
                    <h4 className="font-semibold mb-1">Error</h4>
                    <p>{error}</p>
                  </div>
                )}
                
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Post Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter an engaging title for your post..."
                    className="w-full px-6 py-4 text-2xl font-heading border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    required
                  />
                </div>
                
                <ImageUpload
                  onImageUpload={handleImageUpload}
                  currentImageUrl={imageUrl}
                  onImageRemove={handleImageRemove}
                />
                
                <div>
                  <label htmlFor="content" className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Post Content *
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your story... Use this space to share your insights, experiences, and ideas."
                    rows={16}
                    className="w-full px-6 py-4 text-lg leading-relaxed border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-vertical"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Approximately {Math.ceil(content.split(' ').filter(word => word.length > 0).length / 200)} minute read
                  </p>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                  <input
                    id="published"
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="h-5 w-5 text-accent focus:ring-accent border-border rounded"
                  />
                  <div>
                    <label htmlFor="published" className="block text-sm font-semibold">
                      {published ? 'Publish immediately' : 'Save as draft'}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {published ? 'Your post will be visible to all visitors' : 'Only you will be able to see this post'}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t">
                  <Link
                    href="/"
                    className="px-6 py-3 border border-border rounded-lg text-muted-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                  >
                    Cancel
                  </Link>
                  
                  <div className="flex gap-3">
                    {!published && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setPublished(false)
                          handleSubmit({ preventDefault: () => {} } as React.FormEvent)
                        }}
                        disabled={loading}
                        className="px-6 py-3"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Draft
                      </Button>
                    )}
                    
                    <Button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          Creating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          {published ? 'Publish Post' : 'Save as Draft'}
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}