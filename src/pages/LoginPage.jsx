import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import 'react-toastify/dist/ReactToastify.css';
import { showSuccess, showError } from '../services/toast';

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.login(formData);
      const { token, username, email } = res.data;

      // 保存到 localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username, email }));

      showSuccess('Login successful!')
      navigate('/'); // 登录成功跳转到 HomePage
    } catch (err) {
      console.log('Login Error:', err.response)
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Login failed';
      showError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-0">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-gray-700">Username <span className='text-red-500'>*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password <span className='text-red-500'>*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
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
          <Link to="/regist" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
