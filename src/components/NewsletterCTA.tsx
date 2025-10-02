'use client'

import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsletterCTA = () => {
  return (
    <section className="bg-accent text-accent-foreground rounded-2xl overflow-hidden my-16 lg:my-24">
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-foreground/10 rounded-full mb-6">
            <Mail className="h-8 w-8" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Join Our Community
          </h2>
          
          <p className="text-lg lg:text-xl mb-8 opacity-90">
            Get the latest articles and insights delivered to your inbox. 
            Stay updated with quality content from our writers.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-accent-foreground/10 border border-accent-foreground/20 rounded-lg text-accent-foreground placeholder:text-accent-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent-foreground/40"
              required
            />
            <Button
              type="submit"
              className="px-8 py-3 bg-accent-foreground text-accent font-semibold rounded-lg hover:bg-accent-foreground/90 transition-colors"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm mt-4 opacity-75">
            Join our growing community. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;