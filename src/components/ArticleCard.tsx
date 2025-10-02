'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, User, ArrowRight, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BlogPost } from '@/types/database';

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

const ArticleCard = ({
  post,
  featured = false,
}: ArticleCardProps) => {
  const { user } = useAuth();
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorName = (post: BlogPost) => {
    // First priority: display_name from profiles relationship
    if (post.profiles?.display_name) {
      return post.profiles.display_name;
    }
    if (post.profile?.display_name) {
      return post.profile.display_name;
    }
    
    // Second priority: Try to get email from author object
    if (post.author?.email) {
      return post.author.email.split('@')[0];
    }
    
    // Third priority: If we have author_id, we can try to derive from that
    // This would be a username extracted from the user ID pattern if available
    if (post.author_id) {
      // This could be enhanced to fetch user data if needed
      return `User ${post.author_id.slice(0, 8)}`;
    }
    
    // Last resort fallback
    return 'Unknown Author';
  };

  const getExcerpt = (content: string, maxLength: number = 200) => {
    // Strip HTML tags for excerpt
    const textContent = content.replace(/<[^>]*>/g, '');
    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength).trim() + '...';
  };

  const getReadingTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    return Math.ceil(words / 200); // 200 words per minute average
  };

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500">
        <Link href={`/post/${post.id}`} className="block">
          {/* Hero Image Area with Gradient Overlay */}
          <div className="relative h-[500px] lg:h-[600px] bg-gradient-to-br from-accent/20 via-primary/10 to-accent/30 overflow-hidden">
            {/* Display actual image or placeholder */}
            {post.image_url ? (
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-stone/20 to-charcoal/20 group-hover:scale-105 transition-transform duration-700" />
            )}
            
            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Featured Badge */}
            <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-wider rounded-full shadow-lg">
                <span className="w-2 h-2 bg-accent-foreground rounded-full animate-pulse"></span>
                Featured Story
              </span>
            </div>
            
            {/* Edit Button for Author */}
            {user && post.author_id === user.id && (
              <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/edit-post/${post.id}`;
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full hover:bg-white/30 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
              </div>
            )}

            {/* Main Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 text-white">
              <div className="max-w-4xl">
                <h1 className="text-3xl lg:text-6xl font-heading font-bold mb-4 lg:mb-6 group-hover:text-accent transition-colors duration-300 leading-tight">
                  {post.title}
                </h1>
                <p className="text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 line-clamp-2 leading-relaxed">
                  {getExcerpt(post.content, 300)}
                </p>
                
                {/* Meta Information */}
                <div className="flex items-center gap-4 lg:gap-6 text-sm lg:text-base text-white/80">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{getAuthorName(post)}</span>
                  </div>
                  <span className="text-white/60">•</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <span className="text-white/60">•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{getReadingTime(post.content)} min read</span>
                  </div>
                </div>

                {/* Read More CTA */}
                <div className="mt-6 lg:mt-8">
                  <div className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                    Read Full Story
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift">
      <Link href={`/post/${post.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-accent/10 via-whisper to-accent/5">
          {post.image_url ? (
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-10 h-10 bg-accent/40 rounded-full"></div>
              </div>
            </div>
          )}
          {/* Image zoom effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Category/Type Badge and Edit Button */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider rounded-full">
                Article
              </span>
              {!post.published && (
                <span className="ml-2 bg-warning/20 text-warning px-3 py-1 rounded-full text-xs font-medium">
                  Draft
                </span>
              )}
            </div>
            
            {/* Edit Button for Author */}
            {user && post.author_id === user.id && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/edit-post/${post.id}`;
                }}
                className="inline-flex items-center gap-1 px-2 py-1 text-muted-foreground hover:text-accent text-xs font-medium rounded transition-colors"
              >
                <Edit className="h-3 w-3" />
                Edit
              </button>
            )}
          </div>
          
          {/* Title */}
          <h2 className="text-xl lg:text-2xl font-heading font-semibold mb-4 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h2>
          
          {/* Excerpt */}
          <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
            {getExcerpt(post.content)}
          </p>
          
          {/* Meta Information */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <User className="h-3 w-3" />
              <span>{getAuthorName(post)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{getReadingTime(post.content)} min read</span>
            </div>
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
            <span>Read More</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;