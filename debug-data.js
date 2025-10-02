const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://inrdkkelbzjztonoaacs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucmRra2VsYnpqenRvbm9hYWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzODIyMjgsImV4cCI6MjA3NDk1ODIyOH0.f8Q-ZMCkhgN1EX09S9bHwxKAAgG0mP0XhzfbTHy8Nyg'

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
    .limit(10)
  
  if (postsError) {
    console.error('Posts error:', postsError)
  } else {
    console.log('Posts data:', JSON.stringify(posts, null, 2))
    console.log('Number of posts:', posts?.length || 0)
  }

  console.log('\n=== PROFILES DATA ===')
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .limit(10)
  
  if (profilesError) {
    console.error('Profiles error:', profilesError)
  } else {
    console.log('Profiles data:', JSON.stringify(profiles, null, 2))
    console.log('Number of profiles:', profiles?.length || 0)
  }
}

debugData().catch(console.error)