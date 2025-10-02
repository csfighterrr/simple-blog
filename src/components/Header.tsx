'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, PenTool, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    { name: 'Articles', href: '#' },
    { name: 'Categories', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <nav className="flex items-center justify-between h-20 px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:bg-accent/90 transition-colors">
                <PenTool className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold tracking-tight group-hover:text-accent transition-colors">
                  Simple Blog
                </h1>
                {/* <p className="text-xs text-muted-foreground hidden lg:block">
                  Thoughtful Writing
                </p> */}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide hover:text-accent transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Search */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Search Expandable Input */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 p-4 bg-background border rounded-lg shadow-card-hover animate-fade-in">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="flex-1 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                      autoFocus
                    />
                    <Button size="sm" className="px-4">
                      Search
                    </Button>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Press ESC to close
                  </div>
                </div>
              )}
            </div>

            {/* Auth Links */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link 
                  href="/auth" 
                  className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors px-3 py-2 rounded-md hover:bg-muted"
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link 
                  href="/create-post" 
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-all shadow-button hover:shadow-card text-sm font-medium"
                >
                  <PenTool className="h-4 w-4" />
                  Write
                </Link>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className="hidden md:inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-all shadow-button hover:shadow-card text-sm font-medium"
              >
                <User className="h-4 w-4" />
                Join Us
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-muted transition-colors"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 top-20 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Mobile Menu Content */}
            <div className="md:hidden bg-background/95 backdrop-blur-md border-t animate-fade-in relative z-50">
              <div className="flex flex-col py-6 px-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium hover:text-accent transition-colors py-3 px-2 rounded-md hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="border-t pt-4 mt-4 space-y-3">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-lg font-medium">Dark Mode</span>
                    <ThemeToggle />
                  </div>
                  
                  {/* Mobile Search */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="flex-1 px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    />
                    <Button size="sm" className="px-4">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Mobile Auth Links */}
                  {user ? (
                    <>
                      <Link 
                        href="/auth" 
                        className="flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors py-3 px-2 rounded-md hover:bg-muted"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        Dashboard
                      </Link>
                      <Link 
                        href="/create-post" 
                        className="flex items-center gap-3 bg-accent text-accent-foreground px-4 py-3 rounded-md hover:bg-accent/90 transition-colors text-lg font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <PenTool className="h-5 w-5" />
                        Write Post
                      </Link>
                    </>
                  ) : (
                    <Link 
                      href="/auth" 
                      className="flex items-center gap-3 bg-accent text-accent-foreground px-4 py-3 rounded-md hover:bg-accent/90 transition-colors text-lg font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      Join Us
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Close search on ESC */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsSearchOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;