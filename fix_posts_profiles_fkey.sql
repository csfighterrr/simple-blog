-- Migration to fix the relationship between posts and profiles
-- Run this in your Supabase SQL Editor

-- First, ensure all users have profiles (run this to create missing profiles)
INSERT INTO profiles (id, display_name)
SELECT 
  au.id,
  COALESCE(au.raw_user_meta_data->>'display_name', split_part(au.email, '@', 1))
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM profiles p WHERE p.id = au.id
);

-- Now we can safely add a foreign key constraint from posts to profiles
-- This will allow Supabase to understand the relationship for automatic joins

-- First drop the existing constraint if it exists
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_author_id_fkey;

-- Add the constraint pointing to profiles instead of auth.users
-- This enables the automatic join functionality in Supabase
ALTER TABLE posts 
ADD CONSTRAINT posts_author_id_profiles_fkey 
FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Update the comment to reflect the new relationship
COMMENT ON COLUMN posts.author_id IS 'References profiles.id (which in turn references auth.users.id)';