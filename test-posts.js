// Quick test to debug the posts relationship issue
import { blogPosts } from './src/lib/supabase-utils.js'

async function testPostsQuery() {
  console.log('Testing blogPosts.getAll()...')
  
  try {
    const { data, error } = await blogPosts.getAll()
    
    if (error) {
      console.error('Error:', error)
      console.error('Error message:', error.message)
      console.error('Error details:', JSON.stringify(error, null, 2))
    } else {
      console.log('Success! Posts retrieved:', data?.length || 0)
      console.log('First post structure:', data?.[0] ? JSON.stringify(data[0], null, 2) : 'No posts')
    }
  } catch (err) {
    console.error('Exception caught:', err)
  }
}

testPostsQuery()