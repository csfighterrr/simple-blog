'use client'

import Link from 'next/link';
import { Mail, Twitter, Instagram, Linkedin, Github, Heart, ArrowUp, PenTool } from 'lucide-react';

const Footer = () => {
  const categories = [
    { name: 'Technology', href: '#', count: '24 articles' },
    { name: 'Design', href: '#', count: '18 articles' },
    { name: 'Culture', href: '#', count: '15 articles' },
    { name: 'Ideas', href: '#', count: '21 articles' },
    { name: 'Innovation', href: '#', count: '12 articles' },
  ];

  const company = [
    { name: 'About Us', href: '#' },
    { name: 'Our Story', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press Kit', href: '#' },
  ];

  const resources = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR', href: '#' },
    { name: 'Sitemap', href: '#' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', handle: '@simpleblog' },
    { icon: Instagram, href: '#', label: 'Instagram', handle: '@simpleblog' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', handle: 'Simple Blog' },
    { icon: Github, href: '#', label: 'GitHub', handle: 'simpleblog' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-secondary via-secondary/50 to-whisper border-t mt-16 lg:mt-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-16 lg:py-20">
          {/* About Section */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <PenTool className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold">Simple Blog</h2>
                <p className="text-xs text-muted-foreground">Thoughtful Writing</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A sophisticated platform for sharing thoughts, ideas, and insights. 
              Where quality writing meets elegant design, creating meaningful connections 
              through the power of words.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 bg-muted hover:bg-accent hover:text-accent-foreground rounded-lg transition-all group"
                  title={social.handle}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">
              Popular Categories
            </h3>
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="group flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="group-hover:text-accent transition-colors">
                      {category.name}
                    </span>
                    <span className="text-xs opacity-60">{category.count}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">
              Stay Updated
            </h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Get our weekly digest of the best articles, curated specifically for thoughtful readers.
            </p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
                <button
                  className="px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all shadow-button hover:shadow-card flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Join 1,200+ subscribers. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              © {new Date().getFullYear()} Simple Blog. Made with 
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              for readers everywhere.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Legal Links */}
            <div className="flex gap-6">
              {resources.slice(0, 2).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group"
              aria-label="Back to top"
            >
              <span className="hidden sm:inline">Back to top</span>
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="border-t py-6">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            {resources.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;