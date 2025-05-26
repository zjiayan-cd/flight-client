import React from 'react'

const response = {
  user: {
    id: '123',
    name: 'John Doe',
    avatar: '/avatar.png',
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....'
}

// 存储用户和 token
localStorage.setItem('token', response.token)
localStorage.setItem('user', JSON.stringify(response.user))

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot link */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot username or password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Log In
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
