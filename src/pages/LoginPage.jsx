import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import 'react-toastify/dist/ReactToastify.css';
import { showSuccess, showError } from '../services/toast';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation('login');

  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.login(formData);

      // 保存到 localStorage
      login(res.data.data)
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
    <div className="h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">{t('title')}</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-gray-700">{t('username')} <span className='text-red-500'>*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t('usernamePlaceholder')}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">{t('password')} <span className='text-red-500'>*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('passwordPlaceholder')}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot link */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
            {t('forgot')}
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 font-medium rounded-md hover:bg-blue-700 transition duration-200"
          >
            {t('submit')}
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600 mt-4">
        {t('noAccount')}{' '}
          <Link to="/regist" className="text-blue-500 hover:underline">{t('signup')}</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
