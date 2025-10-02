'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { blogPosts } from '@/lib/supabase-utils'
import { BlogPost } from '@/types/database'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import NewsletterCTA from '@/components/NewsletterCTA'

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const loadPosts = useCallback(async () => {
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
  }, [user])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {loading ? (
          <div className="container mx-auto px-4 lg:px-8 py-16">
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          </div>
        ) : error ? (
          <div className="container mx-auto px-4 lg:px-8 py-16">
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-4 rounded-lg max-w-2xl mx-auto">
              <h3 className="font-semibold mb-1">Error Loading Posts</h3>
              <p>{error}</p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="container mx-auto px-4 lg:px-8 py-16">
            <div className="text-center py-24">
              <h2 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
                Welcome to Simple Blog
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                A sophisticated platform for sharing thoughts, ideas, and insights. 
                The first posts are waiting to be created.
              </p>
              {user && (
                <a 
                  href="/create-post"
                  className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-lg hover:bg-accent/90 transition-colors font-semibold text-lg"
                >
                  Create Your First Post
                </a>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Hero Section with Featured Post */}
            {featuredPost && (
              <section className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
                <ArticleCard post={featuredPost} featured />
              </section>
            )}

            {/* Recent Articles Grid */}
            {recentPosts.length > 0 && (
              <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
                <div className="flex items-center justify-between mb-8 lg:mb-12">
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold">
                    Recent Stories
                  </h2>
                  {posts.length > 6 && (
                    <a
                      href="#"
                      className="text-accent hover:text-accent/80 font-medium transition-colors"
                    >
                      View All →
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {recentPosts.map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Newsletter CTA */}
            <section className="container mx-auto px-4 lg:px-8">
              <NewsletterCTA />
            </section>

            {/* Category Showcases */}
            <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-8 lg:mb-12">
                Explore by Category
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {['Technology', 'Design', 'Culture', 'Ideas'].map((category) => (
                  <a
                    key={category}
                    href="#"
                    className="group relative h-48 lg:h-64 rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 group-hover:from-accent/30 group-hover:to-primary/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground group-hover:text-accent transition-colors">
                        {category}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
