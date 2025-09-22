'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function UserProfile() {
  const { user, signOut, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return (
      <div className="p-4">
        <p>Please sign in to view your profile.</p>
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email:</label>
        <p className="text-gray-900">{user.email}</p>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">User ID:</label>
        <p className="text-gray-900 text-sm font-mono">{user.id}</p>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Created:</label>
        <p className="text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
      </div>
      
      <button
        onClick={handleSignOut}
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Sign Out
      </button>
    </div>
  )
}