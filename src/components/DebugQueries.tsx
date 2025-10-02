'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function DebugQueries() {
  const [results, setResults] = useState<any>({})

  useEffect(() => {
    testQueries()
  }, [])

  const testQueries = async () => {
    const tests: any = {}

    // Test 1: Get posts without join
    try {
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .limit(5)
      
      tests.postsOnly = { 
        success: !postsError, 
        error: postsError?.message,
        count: posts?.length || 0,
        data: posts?.[0] || null
      }
    } catch (err: any) {
      tests.postsOnly = { success: false, error: err.message }
    }

    // Test 2: Get profiles
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .limit(5)
      
      tests.profilesOnly = { 
        success: !profilesError, 
        error: profilesError?.message,
        count: profiles?.length || 0,
        data: profiles?.[0] || null
      }
    } catch (err: any) {
      tests.profilesOnly = { success: false, error: err.message }
    }

    // Test 3: Join with automatic detection
    try {
      const { data: postsWithProfiles, error: joinError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles(
            id,
            display_name,
            avatar_url
          )
        `)
        .limit(5)
      
      tests.automaticJoin = { 
        success: !joinError, 
        error: joinError?.message,
        count: postsWithProfiles?.length || 0,
        data: postsWithProfiles?.[0] || null
      }
    } catch (err: any) {
      tests.automaticJoin = { success: false, error: err.message }
    }

    // Test 4: Join with explicit foreign key
    try {
      const { data: postsWithProfiles2, error: joinError2 } = await supabase
        .from('posts')
        .select(`
          *,
          profiles!posts_author_id_profiles_fkey(
            id,
            display_name,
            avatar_url
          )
        `)
        .limit(5)
      
      tests.explicitJoin = { 
        success: !joinError2, 
        error: joinError2?.message,
        count: postsWithProfiles2?.length || 0,
        data: postsWithProfiles2?.[0] || null
      }
    } catch (err: any) {
      tests.explicitJoin = { success: false, error: err.message }
    }

    setResults(tests)
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Database Query Debug</h1>
      
      {Object.entries(results).map(([testName, result]: [string, any]) => (
        <div key={testName} className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">{testName}</h2>
          <div className={`p-2 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
            <p><strong>Success:</strong> {result.success ? 'Yes' : 'No'}</p>
            {result.error && <p><strong>Error:</strong> {result.error}</p>}
            <p><strong>Count:</strong> {result.count}</p>
            {result.data && (
              <details className="mt-2">
                <summary>Sample Data</summary>
                <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}