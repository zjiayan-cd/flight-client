import React, { useState } from 'react'
import api from '../api'
import { showError } from '../services/toast'
import { useAuth } from '../context/AuthContext'

function LoginModal({ onClose }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState( {username: '', password: ''} )
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.login(formData)
      try{
        login(res.data)
        onClose()
      }catch(innerError){
        console.error('[LoginModal] onLoginSuccess 报错：', innerError);
      }
    } catch (err) {
        console.log('[LoginModal]error:',err?.response)
        const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Login failed';
        console.log('[LoginModal]error msg:', msg)
      showError(msg);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Login Required</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username <span className='text-red-500'>*</span></label>
            <input
              className="w-full border px-3 py-2 rounded"
              type="text"
              value={formData.username}
              onChange={handleChange}
              name="username"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password <span className='text-red-500'>*</span></label>
            <input
              className="w-full border px-3 py-2 rounded"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
