import React, { useTransition } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { t } = useTranslation('navbar')

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
          ✈️ {t('logo')}
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6 text-gray-700">
          <Link to="/" className="hover:text-blue-600 font-medium">{t('search')}</Link>
          {user && (
            <Link to="/my-booking" className="hover:text-blue-600 font-medium">
              {t('myBooking')}
            </Link>
          )}
          <LanguageSwitcher />
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || '/default-avatar.png'}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={logout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              {t('login')}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
