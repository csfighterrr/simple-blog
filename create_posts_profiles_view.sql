-- Database relationship fix for posts and profiles
-- This establishes the proper relationship for Supabase joins

-- Create a view that makes the relationship explicit
CREATE OR REPLACE VIEW posts_with_profiles AS
SELECT 
  p.*,
  pr.id as profile_id,
  pr.display_name,
  pr.avatar_url,
  pr.bio,
  pr.website
FROM posts p
LEFT JOIN profiles pr ON p.author_id = pr.id;

-- Grant permissions on the view
GRANT SELECT ON posts_with_profiles TO authenticated;
GRANT SELECT ON posts_with_profiles TO anon;

-- Create an RLS policy for the view
ALTER VIEW posts_with_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts with profiles are viewable by everyone" ON posts_with_profiles
  FOR SELECT USING (published = true);

CREATE POLICY "Users can view their own posts with profiles" ON posts_with_profiles
  FOR SELECT USING (auth.uid() = author_id);