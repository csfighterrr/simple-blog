-- Migration to ensure all users have proper profiles with display names
-- This addresses the issue where posts show "Anonymous" instead of user names

-- First, ensure all users from auth.users have corresponding profiles
-- This will create profiles for any existing users who don't have them yet
INSERT INTO public.profiles (id, display_name)
SELECT 
  au.id,
  COALESCE(
    au.raw_user_meta_data->>'display_name',  -- Use display_name from metadata if available
    split_part(au.email, '@', 1),            -- Otherwise use email username
    'User_' || substr(au.id::text, 1, 8)     -- Fallback to shortened user ID
  )
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = au.id
)
ON CONFLICT (id) DO NOTHING;

-- Update existing profiles that have null display_name
-- This will fix profiles that exist but don't have a proper display name
UPDATE public.profiles
SET display_name = COALESCE(
  (SELECT split_part(au.email, '@', 1) 
   FROM auth.users au 
   WHERE au.id = profiles.id),
  'User_' || substr(id::text, 1, 8)
)
WHERE display_name IS NULL OR display_name = '';

-- Optional: Add a check constraint to ensure display_name is never null
-- ALTER TABLE public.profiles 
-- ADD CONSTRAINT profiles_display_name_not_null 
-- CHECK (display_name IS NOT NULL AND display_name != '');