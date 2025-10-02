const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.log('Please check your .env.local file for Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugData() {
  console.log('=== POSTS DATA ===')
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select(`
      *,
      profiles(
        id,
        display_name,
        avatar_url
      )
    `)
    .limit(3)
  
  if (postsError) {
    console.error('Posts error:', postsError)
  } else {
    console.log('Posts data:', JSON.stringify(posts, null, 2))
  }

  console.log('\n=== PROFILES DATA ===')
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .limit(3)
  
  if (profilesError) {
    console.error('Profiles error:', profilesError)
  } else {
    console.log('Profiles data:', JSON.stringify(profiles, null, 2))
  }

  console.log('\n=== AUTH USERS DATA ===')
  const { data: users, error: usersError } = await supabase
    .from('auth.users')
    .select('id, email')
    .limit(3)
  
  if (usersError) {
    console.error('Users error:', usersError)
  } else {
    console.log('Users data:', JSON.stringify(users, null, 2))
  }
}

debugData().catch(console.error)