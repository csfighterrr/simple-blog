const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://inrdkkelbzjztonoaacs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlucmRra2VsYnpqenRvbm9hYWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzODIyMjgsImV4cCI6MjA3NDk1ODIyOH0.f8Q-ZMCkhgN1EX09S9bHwxKAAgG0mP0XhzfbTHy8Nyg'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testPosts() {
  // First, let's create a test post using the existing user
  const existingUserId = 'd839030c-750a-4b4a-871a-59002a5fd707' // From our previous debug

  console.log('Creating a test post...')
  const { data: newPost, error: createError } = await supabase
    .from('posts')
    .insert([{
      title: 'Test Post to Check Author Names',
      content: 'This is a test post to see how author names are displayed. The author should show as "susatos9" from the profile display_name.',
      author_id: existingUserId,
      published: true
    }])
    .select()

  if (createError) {
    console.error('Error creating post:', createError)
    return
  }

  console.log('Test post created:', newPost)

  // Now let's fetch posts with profiles to test our query
  console.log('\n=== TESTING POSTS WITH PROFILES ===')
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
    .order('created_at', { ascending: false })

  if (postsError) {
    console.error('Error fetching posts:', postsError)
  } else {
    console.log('Posts with profiles:', JSON.stringify(posts, null, 2))
  }
}

testPosts().catch(console.error)