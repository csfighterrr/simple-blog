#!/bin/bash

# Simple Blog Authentication System Setup Verification
echo "🔍 Verifying Simple Blog Authentication System Setup..."
echo "=================================================="

# Check if the development server is running
echo "📡 Checking if development server is accessible..."
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Development server is running on http://localhost:3001"
else
    echo "❌ Development server is not accessible. Please run 'npm run dev'"
fi

echo ""
echo "📋 Setup Checklist:"
echo "==================="

echo "1. Database Setup:"
echo "   □ Run setup_profiles.sql in your Supabase SQL Editor"
echo "   □ Verify profiles table exists"
echo "   □ Verify RLS policies are active"
echo "   □ Verify trigger function is created"

echo ""
echo "2. Environment Variables:"
echo "   □ NEXT_PUBLIC_SUPABASE_URL is set"
echo "   □ NEXT_PUBLIC_SUPABASE_ANON_KEY is set"

echo ""
echo "3. Test User Registration:"
echo "   □ Go to http://localhost:3001"
echo "   □ Click 'Join Us'"
echo "   □ Try registering a new user"
echo "   □ Check email for confirmation"
echo "   □ Sign in and test profile editing"

echo ""
echo "4. Test Blog Functionality:"
echo "   □ Create a new blog post"
echo "   □ Publish the post"
echo "   □ Verify it appears on the homepage"
echo "   □ Test that only the author can edit their posts"

echo ""
echo "🚀 Quick Test Commands:"
echo "======================"
echo "# Start development server:"
echo "cd /home/nugroho-adi-susanto/Project/Simple-Blog/simple-blog"
echo "npm run dev"
echo ""
echo "# Open the application:"
echo "# Browser: http://localhost:3001"
echo ""
echo "# Test the authentication:"
echo "# 1. Click 'Join Us' → Sign Up tab"
echo "# 2. Register with test email"
echo "# 3. Check for profile creation"
echo "# 4. Try creating a blog post"

echo ""
echo "📄 Database Tables to Verify in Supabase:"
echo "========================================="
echo "- auth.users (managed by Supabase)"
echo "- public.profiles (created by setup_profiles.sql)"
echo "- public.posts (existing table)"

echo ""
echo "🔒 Security Features Active:"
echo "============================"
echo "- Row Level Security on profiles table"
echo "- Users can only edit their own profiles"
echo "- Users can only edit their own posts"
echo "- Published posts are readable by everyone"
echo "- Automatic profile creation on user signup"

echo ""
echo "✨ Ready to test! Visit http://localhost:3001 and try the new authentication system."