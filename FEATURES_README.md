# Edit Articles and Image Upload Features

This update adds the ability to edit articles and upload images to be displayed in articles.

## New Features Added

### 1. Article Editing
- **Edit Post Page**: Located at `/edit-post/[id]`
- **Access Control**: Only the author of a post can edit it
- **Edit Button**: Appears on individual post pages for authenticated authors
- **Full Editing**: Allows editing title, content, image, and publish status

### 2. Image Upload
- **Image Upload Component**: Reusable component for uploading images
- **File Validation**: Supports PNG, JPG, GIF up to 5MB
- **Storage**: Images are stored in Supabase storage bucket `post-images`
- **Organization**: Images are organized by user ID for better management
- **Image Display**: Images are displayed in article cards and individual post pages

### 3. Database Updates
- **New Column**: Added `image_url` field to the `posts` table
- **Storage Bucket**: Created `post-images` bucket with proper RLS policies
- **Migrations**: All changes are version-controlled with Supabase migrations

## Usage

### Creating Posts with Images
1. Go to "Create Post" (authenticated users only)
2. Fill in title and content
3. Optionally upload a featured image
4. Choose to publish or save as draft

### Editing Posts
1. Navigate to any post you authored
2. Click the "Edit Post" button (visible only to authors)
3. Make your changes including adding/removing images
4. Save changes

### Image Management
- Images are automatically optimized for web display
- Uploaded images are stored securely with user-specific paths
- Remove images by clicking the X button in the image preview

## Technical Implementation

### Database Schema Changes
```sql
-- Added image_url column to posts table
ALTER TABLE posts ADD COLUMN image_url TEXT;

-- Created storage bucket and policies
INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true);
```

### New Components
- `ImageUpload.tsx`: Handles image upload functionality
- `edit-post/[id]/page.tsx`: Edit post page with full functionality

### Updated Components
- `ArticleCard.tsx`: Now displays featured images in post cards
- `post/[id]/page.tsx`: Shows featured images and edit button
- `create-post/page.tsx`: Includes image upload capability

### Storage Configuration
- Bucket: `post-images`
- Path structure: `post-images/{user_id}/{timestamp}-{random}.{ext}`
- Public read access for displaying images
- Authenticated upload access
- User-specific delete permissions

## Security Features
- Only authenticated users can upload images
- Users can only edit their own posts
- Images are organized by user ID to prevent conflicts
- Proper RLS policies protect against unauthorized access

## File Size and Type Restrictions
- Maximum file size: 5MB
- Supported formats: PNG, JPG, GIF
- Automatic file validation before upload
- Unique filename generation to prevent conflicts