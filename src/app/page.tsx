'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { blogPosts } from '@/lib/supabase-utils'
import { BlogPost } from '@/types/database'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import NewsletterCTA from '@/components/NewsletterCTA'
import { ArrowRight, BookOpen, Users, TrendingUp } from 'lucide-react'

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
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Header />
      
      <main id="main-content" className="pt-20">
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
              <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                Welcome to Simple Blog
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                A sophisticated platform for sharing thoughts, ideas, and insights. 
                Where quality writing meets elegant design.
              </p>
              {user && (
                <a 
                  href="/create-post"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg hover:bg-accent/90 transition-all shadow-button hover:shadow-card-hover font-semibold text-lg"
                >
                  Create Your First Post
                  <ArrowRight className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Hero Section with Featured Post */}
            {featuredPost && (
              <section className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider rounded-full">
                    Featured Story
                  </span>
                </div>
                <ArticleCard post={featuredPost} featured />
              </section>
            )}

            {/* Quick Stats Section */}
            <section className="bg-whisper py-12 lg:py-16">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full">
                      <BookOpen className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold">{posts.length}</h3>
                    <p className="text-muted-foreground">Articles Published</p>
                  </div>
                  <div className="space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold">1.2K+</h3>
                    <p className="text-muted-foreground">Monthly Readers</p>
                  </div>
                  <div className="space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold">95%</h3>
                    <p className="text-muted-foreground">Reader Satisfaction</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Articles Grid */}
            {recentPosts.length > 0 && (
              <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
                <div className="flex items-end justify-between mb-12 lg:mb-16">
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 leading-tight">
                      Recent Stories
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      Discover our latest insights, ideas, and perspectives on technology, 
                      design, culture, and innovation.
                    </p>
                  </div>
                  {posts.length > 6 && (
                    <a
                      href="#"
                      className="hidden lg:inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group"
                    >
                      View All Articles
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {recentPosts.map((post, index) => (
                    <div 
                      key={post.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ArticleCard post={post} />
                    </div>
                  ))}
                </div>

                {posts.length > 6 && (
                  <div className="text-center mt-12 lg:hidden">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
                    >
                      View All Articles
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </section>
            )}

            {/* Newsletter CTA */}
            <section className="container mx-auto px-4 lg:px-8">
              <NewsletterCTA />
            </section>

            {/* Category Showcases */}
            <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
                  Explore by Category
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Dive deeper into the topics that matter to you. From cutting-edge technology 
                  to timeless design principles.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                {[
                  { name: 'Technology', color: 'from-blue-500/20 to-purple-500/20', posts: '24' },
                  { name: 'Design', color: 'from-pink-500/20 to-rose-500/20', posts: '18' },
                  { name: 'Culture', color: 'from-green-500/20 to-emerald-500/20', posts: '15' },
                  { name: 'Ideas', color: 'from-amber-500/20 to-orange-500/20', posts: '21' }
                ].map((category) => (
                  <a
                    key={category.name}
                    href="#"
                    className="group relative h-56 lg:h-72 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} group-hover:scale-105 transition-transform duration-300`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.posts} articles
                      </p>
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
