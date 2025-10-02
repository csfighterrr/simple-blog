'use client'

import Link from 'next/link';
import { Clock } from 'lucide-react';
import { BlogPost } from '@/types/database';

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

const ArticleCard = ({
  post,
  featured = false,
}: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorName = (post: BlogPost) => {
    if (post.profile?.display_name) {
      return post.profile.display_name;
    }
    if (post.author?.email) {
      return post.author.email.split('@')[0];
    }
    return 'Anonymous';
  };

  const getExcerpt = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (featured) {
    return (
      <Link
        href={`/post/${post.id}`}
        className="group block relative overflow-hidden rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300"
      >
        <div className="relative h-[500px] lg:h-[600px] bg-gradient-to-br from-accent/20 to-primary/20">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 text-white">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Featured
            </span>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-4 group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            <p className="text-lg lg:text-xl text-white/90 mb-6 line-clamp-2 max-w-3xl">
              {getExcerpt(post.content, 300)}
            </p>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span>{getAuthorName(post)}</span>
              <span>•</span>
              <span>{formatDate(post.created_at)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {Math.ceil(post.content.length / 1000)} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/post/${post.id}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-accent/40 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider rounded mb-3">
          Article
        </span>
        
        <h3 className="text-xl lg:text-2xl font-heading font-semibold mb-3 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {getExcerpt(post.content)}
        </p>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{getAuthorName(post)}</span>
          <span>•</span>
          <span>{formatDate(post.created_at)}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {Math.ceil(post.content.length / 1000)} min read
          </span>
        </div>

        {!post.published && (
          <div className="mt-3">
            <span className="bg-warning-amber/20 text-warning-amber px-2 py-1 rounded text-xs font-medium">
              Draft
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;