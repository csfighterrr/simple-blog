# Simple Blog

A sophisticated blog platform built with Next.js 15 and Supabase, featuring a refined design system inspired by premium publishing platforms.

## ✨ Features

### Design & User Experience
- **Sophisticated Typography** - Playfair Display for headings, Inter for body text
- **Elegant Color Palette** - Carefully crafted HSL color system with accent gold
- **Responsive Design** - Mobile-first approach with fluid layouts
- **Smooth Animations** - Subtle transitions and hover effects
- **Card-based Layout** - Clean, modern content presentation

### Functionality
- **Authentication** - Secure user authentication with Supabase
- **Content Management** - Create, edit, and publish blog posts
- **Draft System** - Save posts as drafts before publishing
- **Dynamic Routing** - Individual post pages with clean URLs
- **Admin Dashboard** - Manage posts and user profile
- **Reading Time** - Automatic reading time calculation

### Technical Stack
- **Next.js 15** - Latest React framework with app router
- **TypeScript** - Full type safety
- **Tailwind CSS 4** - Utility-first styling with custom design system
- **Supabase** - Backend as a service for auth and database
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful, customizable icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-blog
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── auth/              # Authentication pages
│   ├── create-post/       # Post creation
│   ├── post/[id]/         # Dynamic post pages
│   ├── globals.css        # Global styles with design system
│   ├── layout.tsx         # Root layout with fonts
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── ArticleCard.tsx   # Blog post card component
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   └── NewsletterCTA.tsx # Newsletter signup
├── contexts/             # React contexts
├── lib/                  # Utility functions
└── types/               # TypeScript definitions
```

## 🎨 Design System

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif) 
- **Accent**: Poppins (sans-serif)

### Colors
- **Primary**: Rich blacks and whites
- **Accent**: Sophisticated gold (#B8860B)
- **Grays**: Carefully calibrated neutral scale
- **Semantic**: Success, warning, and error colors

### Components
- **Cards**: Subtle shadows with hover effects
- **Buttons**: Consistent sizing and states
- **Forms**: Clean, accessible inputs
- **Typography**: Optimized reading experience

## 🔧 Configuration

The project uses a sophisticated Tailwind CSS configuration with:
- Custom color system using HSL values
- Typography scale optimized for reading
- Spacing system based on design tokens
- Custom animations and transitions
- Responsive breakpoints

## 📚 Usage

### Creating Posts
1. Sign in to access the admin dashboard
2. Click "Create Post" in the navigation
3. Write your content with the rich editing experience
4. Choose to save as draft or publish immediately
5. View your published posts on the homepage

### Customization
- Modify design tokens in `globals.css`
- Update typography in `tailwind.config.ts`
- Customize components in the `components/` directory
- Extend the color palette as needed

## 🛠️ Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding Features
1. Create components in the `components/` directory
2. Add pages to the `app/` directory
3. Update types in `types/database.ts`
4. Follow the established design patterns

## 🎯 Roadmap

- [ ] Rich text editor for post creation
- [ ] Image upload and management
- [ ] Categories and tags system
- [ ] Search functionality
- [ ] Comments system
- [ ] SEO optimization
- [ ] Social sharing
- [ ] Dark mode toggle

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and Supabase
