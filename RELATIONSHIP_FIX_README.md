# Posts-Profiles Relationship Fix

## Problem
The error "Could not find a relationship between 'posts' and 'profiles' in the schema cache" occurs because Supabase cannot automatically detect the relationship between these two tables.

## Root Cause
- `posts.author_id` references `auth.users(id)`
- `profiles.id` also references `auth.users(id)`
- There's no direct foreign key relationship between `posts` and `profiles`

## Solutions

### Solution 1: Database Migration (Recommended)
Run the SQL migration in `fix_posts_profiles_fkey.sql`:

```sql
-- This creates a direct foreign key relationship
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_author_id_fkey;
ALTER TABLE posts 
ADD CONSTRAINT posts_author_id_profiles_fkey 
FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE;
```

After running this migration, you can use:
```typescript
// This will work after the migration
const { data, error } = await supabase
  .from('posts')
  .select(`
    *,
    profiles!posts_author_id_profiles_fkey(
      id,
      display_name,
      avatar_url
    )
  `)
```

### Solution 2: Separate Queries (Current Implementation)
The current implementation in `supabase-utils.ts` uses separate queries:

1. Fetch all posts
2. Extract unique author IDs
3. Fetch profiles for those authors
4. Combine the data manually

This approach is more reliable and works without database changes.

### Solution 3: Database View
Create a view that combines posts with profiles:

```sql
CREATE VIEW posts_with_profiles AS
SELECT 
  p.*,
  pr.display_name,
  pr.avatar_url,
  pr.bio
FROM posts p
LEFT JOIN profiles pr ON p.author_id = pr.id;
```

## Files Created
- `fix_posts_profiles_fkey.sql` - Database migration to fix foreign key
- `create_posts_profiles_view.sql` - Alternative view-based solution
- `supabase-utils-with-fkey.ts` - Updated utils with both approaches

## Current Status
The application should now work with the separate queries approach implemented in the main `supabase-utils.ts` file.