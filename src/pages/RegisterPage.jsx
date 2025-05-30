import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    phone: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const payload = {
        username: formData.firstName,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        phone: formData.phone,
      }

      const res = await api.regist(payload)

      // if (res.data.success) {
      //   navigate('/login')
      // } else {
      //   setError(res.data.message || 'Unknown error')
      // }
      navigate('/login'); // 注册成功跳转登录页
      
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Registration failed'
      setError(msg)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Create your account</h2>

        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">User name <span className='text-red-500'>*</span></label>
            <input name="username" value={formData.username} onChange={handleChange} required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700">Email  <span className='text-red-500'>*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700">Password  <span className='text-red-500'>*</span></label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700">Confirm Password  <span className='text-red-500'>*</span></label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-gray-700">Country / Region</label>
            <select name="country" value={formData.country} onChange={handleChange} required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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

          <div>
            <label className="block text-gray-700">Phone Number  <span className='text-red-500'>*</span></label>
            <input name="phone" value={formData.phone} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-500 hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
