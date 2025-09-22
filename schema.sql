# Supabase Database Schema

This file contains the SQL schema for the blog database. Run these commands in your Supabase SQL editor.

## Users table (already exists with Supabase Auth)

The users table is automatically managed by Supabase Auth.

## Posts table

```sql
-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on author_id for faster queries
CREATE INDEX idx_posts_author_id ON posts(author_id);

-- Create an index on created_at for sorting
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies for posts
-- Users can read all published posts
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (published = true);

-- Users can read their own posts (published or not)
CREATE POLICY "Users can view their own posts" ON posts
  FOR SELECT USING (auth.uid() = author_id);

-- Users can insert their own posts
CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Users can update their own posts
CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);
```

## Comments table

```sql
-- Create comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_author_id ON comments(author_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for comments
-- Users can read all comments on published posts
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.id = comments.post_id 
      AND posts.published = true
    )
  );

-- Users can read comments on their own posts
CREATE POLICY "Users can view comments on their own posts" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.id = comments.post_id 
      AND posts.author_id = auth.uid()
    )
  );

-- Users can insert comments on published posts
CREATE POLICY "Users can insert comments on published posts" ON comments
  FOR INSERT WITH CHECK (
    auth.uid() = author_id AND
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.id = comments.post_id 
      AND posts.published = true
    )
  );

-- Users can update their own comments
CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = author_id);
```

## Triggers for updated_at

```sql
-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```