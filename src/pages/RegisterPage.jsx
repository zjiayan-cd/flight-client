import React from 'react'

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Sign Up</h2>

        <form className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Country / Region */}
          <div>
            <label className="block text-gray-700">Country / Region</label>
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Select your country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="cn">China</option>
              <option value="jp">Japan</option>
              <option value="in">India</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Account
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
