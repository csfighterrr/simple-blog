# Simple Blog - Enhanced User Authentication System

This project has been updated with a comprehensive user authentication system that allows all users to register, login, and create blog posts. The admin-only restriction has been removed, making it a true multi-user blogging platform.

## 🚀 Key Features

### User Authentication
- **User Registration**: New users can sign up with email, password, and optional display name
- **User Login**: Existing users can sign in with email and password
- **User Profiles**: Each user has a profile with display name, bio, and website
- **Secure Authentication**: Built on Supabase Auth with Row Level Security (RLS)

### Blog Functionality
- **Create Posts**: All authenticated users can create and publish blog posts
- **Edit Posts**: Users can edit their own posts
- **Public Reading**: Anyone can read published posts
- **Draft System**: Users can save posts as drafts before publishing

### Enhanced UI/UX
- **Unified Auth Form**: Single component with tabs for login and registration
- **Profile Management**: Rich profile editing with display name, bio, and website
- **Author Attribution**: Posts show author's display name or username
- **Responsive Design**: Optimized for desktop and mobile devices

## 📋 Database Schema Updates

### New Tables

#### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Auto-Profile Creation
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Updated Posts Table
- Enhanced with profile relationships for author information
- Maintains RLS policies for user access control

## 🔧 Technical Implementation

### Components Updated

1. **AuthForm.tsx** - New unified authentication component
   - Tabbed interface for login/register
   - Form validation and error handling
   - Success messages and loading states

2. **UserProfile.tsx** - Enhanced profile management
   - Editable profile fields
   - Profile loading and saving
   - Sign out functionality

3. **Header.tsx** - Updated navigation
   - Changed "Admin Login" to "Join Us"
   - Better authenticated user experience

4. **ArticleCard.tsx** - Enhanced author display
   - Shows author display name from profiles
   - Fallback to email username

### Authentication Flow

1. **Registration**:
   - User provides email, password, and optional display name
   - Supabase creates auth user
   - Trigger automatically creates profile record
   - User receives email confirmation

2. **Login**:
   - User provides email and password
   - Supabase validates credentials
   - User session is established
   - Profile data is loaded

3. **Profile Management**:
   - Users can edit display name, bio, and website
   - Changes are saved to profiles table
   - Real-time updates in UI

### Security Features

- **Row Level Security (RLS)** on all tables
- **User Isolation**: Users can only edit their own content
- **Public Reading**: Published posts are visible to everyone
- **Draft Privacy**: Draft posts are only visible to authors

## 🎯 User Experience Improvements

### For New Users
- Simple registration process with optional profile details
- Immediate access to create posts after registration
- Email confirmation for account security

### For Existing Users
- Seamless login experience
- Rich profile customization
- Easy post creation and management

### For Readers
- Enhanced author information display
- Better post discovery
- Professional blog layout

## 🛠 Setup Instructions

1. **Database Setup**: Run the SQL commands in `schema.sql` in your Supabase SQL editor

2. **Environment Variables**: Ensure your Supabase credentials are configured:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Development Server**:
   ```bash
   npm install
   npm run dev
   ```

## 📱 Usage Guide

### For Users
1. Visit the site and click "Join Us"
2. Choose "Sign Up" tab to create an account
3. Fill in email, password, and optional display name
4. Check email for confirmation link
5. Sign in and access your dashboard
6. Edit your profile with bio and website
7. Create your first blog post!

### For Readers
1. Visit the site to browse published posts
2. Click on any post to read the full content
3. See author information and publication dates
4. No registration required for reading

## 🔒 Security Considerations

- All sensitive operations require authentication
- RLS policies prevent unauthorized data access
- Email verification for new accounts
- Secure password requirements
- Session management through Supabase Auth

## 🚧 Future Enhancements

- Comment system for posts
- User avatars and image uploads
- Post categories and tags
- Search functionality
- Social features (follows, likes)
- Email notifications
- Admin moderation tools

## 📞 Support

If you encounter any issues with the authentication system or need help with setup, please check the console for error messages and ensure your Supabase configuration is correct.

---

**Note**: This enhanced system removes the previous admin-only restriction and creates a true multi-user blogging platform where anyone can join, create content, and engage with the community.