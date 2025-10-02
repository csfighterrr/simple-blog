-- Add image_url column to posts table
ALTER TABLE posts ADD COLUMN image_url TEXT;

-- Add index for image_url to help with queries
CREATE INDEX idx_posts_image_url ON posts(image_url) WHERE image_url IS NOT NULL;