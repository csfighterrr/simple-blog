-- Fix the relationship between posts and profiles tables
-- This script adds a foreign key constraint to enable proper joins in Supabase

-- First, let's drop the existing foreign key constraint on posts.author_id if it exists
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_author_id_fkey;

-- Now add a new foreign key constraint that references profiles instead of auth.users
-- This will allow Supabase to understand the relationship for joins
ALTER TABLE posts 
ADD CONSTRAINT posts_author_id_profiles_fkey 
FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Update the index to reflect the new relationship
DROP INDEX IF EXISTS idx_posts_author_id;
CREATE INDEX idx_posts_author_id ON posts(author_id);

-- Verify the relationship works by creating a view (optional, for testing)
CREATE OR REPLACE VIEW posts_with_authors AS
SELECT 
  p.*,
  pr.display_name as author_name,
  pr.avatar_url as author_avatar,
  pr.bio as author_bio
FROM posts p
LEFT JOIN profiles pr ON p.author_id = pr.id;