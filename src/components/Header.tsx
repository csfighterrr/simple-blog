'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#' },
    { name: 'Categories', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <nav className="flex items-center justify-between h-20 px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold tracking-tight">
              Simple Blog
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Auth Links */}
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  href="/auth" 
                  className="text-sm font-medium hover:text-accent transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/create-post" 
                  className="bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-colors text-sm font-medium"
                >
                  Write Post
                </Link>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className="hidden md:block bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-colors text-sm font-medium"
              >
                Join Us
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu with Backdrop */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with blur effect */}
            <div 
              className="fixed inset-0 top-20 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Mobile Menu Content */}
            <div className="md:hidden bg-background border-t animate-fade-in relative z-50">
              <div className="flex flex-col py-4 px-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium hover:text-accent transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Auth Links */}
                {user ? (
                  <>
                    <Link 
                      href="/auth" 
                      className="text-lg font-medium hover:text-accent transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/create-post" 
                      className="text-lg font-medium hover:text-accent transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Write Post
                    </Link>
                  </>
                ) : (
                  <Link 
                    href="/auth" 
                    className="text-lg font-medium hover:text-accent transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join Us
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;