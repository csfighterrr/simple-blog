'use client'

import { Mail, Send, Star, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsletterCTA = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl lg:rounded-3xl my-16 lg:my-24">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/90 to-accent/80">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center text-accent-foreground">
          {/* Icon and Badge */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-foreground/10 rounded-2xl backdrop-blur-sm">
              <Mail className="h-8 w-8" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-semibold uppercase tracking-wider">Newsletter</span>
              </div>
              <p className="text-sm opacity-90">Join 1,200+ readers</p>
            </div>
          </div>
          
          {/* Main heading */}
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
            Stay in the Loop
          </h2>
          
          {/* Description */}
          <p className="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
            Get curated articles, exclusive insights, and thoughtful perspectives 
            delivered to your inbox every week. No spam, just quality content.
          </p>
          
          {/* Social proof */}
          <div className="flex items-center justify-center gap-8 mb-10 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>1,200+ subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Weekly digest</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-current" />
              <span>4.9/5 rating</span>
            </div>
          </div>
          
          {/* Form */}
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-accent-foreground placeholder:text-accent-foreground/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all"
                required
              />
            </div>
            <Button
              type="submit"
              className="px-8 py-4 bg-accent-foreground text-accent font-semibold rounded-xl hover:bg-accent-foreground/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
            >
              Subscribe
              <Send className="h-4 w-4" />
            </Button>
          </form>
          
          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm opacity-75">
            <p>✓ Free forever • ✓ Unsubscribe anytime • ✓ No spam</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-8 right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
    </section>
  );
};

export default NewsletterCTA;