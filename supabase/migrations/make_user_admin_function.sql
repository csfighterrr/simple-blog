-- Helper function to make a user admin
-- Usage: SELECT make_user_admin('user-uuid-here');

CREATE OR REPLACE FUNCTION make_user_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.profiles 
  SET role = 'admin' 
  WHERE id = user_id;
  
  IF FOUND THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Example usage:
-- SELECT make_user_admin('your-user-uuid-here');

-- To check current user roles:
-- SELECT id, display_name, role FROM public.profiles WHERE role = 'admin';