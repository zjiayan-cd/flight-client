import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          ✈️ Flight Booker
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6 text-gray-700">
          <Link to="/" className="hover:text-blue-600 font-medium">Search Flights</Link>
          {user && (
            <Link to="/my-booking" className="hover:text-blue-600 font-medium">
              My Booking
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || '/default-avatar.png'}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={onLogout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
