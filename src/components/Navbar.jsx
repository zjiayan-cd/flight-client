import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { t } = useTranslation('navbar')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-2 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-sm sm:text-xl font-bold text-blue-600 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane-icon lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
          {t('logo')}
        </Link>

        {/* Menu PC*/}
        <div className="hidden sm:flex items-center gap-4 overflow-x-hidden flex-wrap sm:flex-nowrap text-gray-700">
          <Link to="/" className="hidden sm:inline hover:text-blue-600 font-medium">{t('search')}</Link>
          {user && (
            <Link to="/my-booking" className="hidden sm:inline hover:text-blue-600 font-medium">
              {t('myBooking')}
            </Link>
          )}
          <LanguageSwitcher />
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.avatar || '/default-avatar.png'}
                alt="avatar"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full"
              />
              <button
                onClick={logout}
                className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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

        {/* Menu Mobile */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {menuOpen && (
            <div ref={menuRef} className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50">
              <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-100">{t('search')}</Link>
              {user && (
                <Link to="/my-booking" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  {t('myBooking')}
                </Link>
              )}
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
              {user ? (
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  {t('logout')}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                >
                  {t('login')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
