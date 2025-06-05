import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DateInput from '../components/DateInput'
import { useDispatch } from 'react-redux'
import { setSearchData } from '../store/searchSlice'
import api from '../api'
import { useTranslation } from 'react-i18next'

function HomePage() {
  const [tripType, setTripType] = useState('oneway')
  const [airports, setAirports] = useState([])
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [loading, setLoading] = useState(true)
  const [departDate, setDepartDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  const [passengers, setPassengers] = useState(1)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation('home')

  console.log('Translation:', t('bannerTitle'))
  useEffect(() => {
    api.airports()
    .then(res => {
      setAirports(res.data)
      setLoading(false)
    })
    .catch(error => {
      console.error('Error fetching airports:', error)
      setLoading(false)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!from || !to || !departDate) {
      setError(t('errorRequiredFields'))
      return
    }

    if (tripType === 'round' && !returnDate) {
      setError(t('errorReturnDate'))
      return
    }

    setError('')

    dispatch(setSearchData({
      tripType,
      from,
      to,
      departDate: departDate.toISOString(),
      returnDate: returnDate ? returnDate.toISOString() : '',
      passengers,
    }))

    navigate('/flights')
  }

  return (
    <div className="min-h-screen bg-gray-100 bg-gradient-to-br from-blue-100 to-white px-4 pt-16">
      {/* 滚动 Banner */}
      <div
        className="w-full h-48 md:h-60 bg-cover bg-center mb-6 shadow"
        style={{ backgroundImage: `url('https://source.unsplash.com/1600x400/?airplane')` }}
      >
        <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">{t('bannerTitle')}</h1>
        </div>
      </div>

      {/* 搜索表单 */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Trip Type */}
        <div>
          <label className="font-semibold text-gray-700 mr-4">{t('tripType')}</label>
          <label className="mr-4">
            <input
              type="radio"
              name="tripType"
              value="oneway"
              checked={tripType === 'oneway'}
              onChange={() => setTripType('oneway')}
            />{' '}
            {t('oneway')}
          </label>
          <label>
            <input
              type="radio"
              name="tripType"
              value="round"
              checked={tripType === 'round'}
              onChange={() => setTripType('round')}
            />{' '}
            {t('round')}
          </label>
        </div>

        {/* From / To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">
            {t('from')} <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border rounded p-2"
              value={from}
              onChange={e => setFrom(e.target.value)}
              required
            >
              <option value="">{t('selectDeparture')}</option>
              {airports.map(airport => (
                <option key={airport.code} value={airport.code}>
                  {airport.name} ({airport.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">
            {t('to')} <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border rounded p-2"
              value={to}
              onChange={e => setTo(e.target.value)}
              required
            >
              <option value="">{t('selectDestination')}</option>
              {airports.map(airport => (
                <option key={airport.code} value={airport.code}>
                  {airport.name} ({airport.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateInput
            label={
              <span>
                {t('depart')} <span className="text-red-500">*</span>
              </span>
            }
            selected={departDate}
            onChange={setDepartDate}
          />
          {tripType === 'round' && (
            <DateInput label={<span>{t('return')} <span className="text-red-500">*</span></span>} selected={returnDate} onChange={setReturnDate} />
          )}
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-gray-700">{t('passengers')}</label>
          <input
            type="number"
            min="1"
            value={passengers}
            onChange={e => setPassengers(Number(e.target.value))}
            className="w-full font-medium border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 font-medium rounded hover:bg-blue-700 transition"
        >
          {t('searchFlights')}
        </button>
      </form>
    </div>
  )
}

export default HomePage
