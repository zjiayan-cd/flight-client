import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DateInput from '../components/DateInput'
import { useDispatch } from 'react-redux'
import { setSearchData } from '../store/searchSlice'
import api from '../api'

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
      setError('Please fill in all required fields.')
      return
    }

    if (tripType === 'round' && !returnDate) {
      setError('Please select a return date for round-trip.')
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
    <div className="min-h-screen bg-gray-100">
      {/* 滚动 Banner */}
      <div
        className="w-full h-60 bg-cover bg-center mb-8"
        style={{ backgroundImage: `url('https://source.unsplash.com/1600x400/?airplane')` }}
      >
        <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Book Your Flight</h1>
        </div>
      </div>

      {/* 搜索表单 */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Trip Type */}
        <div>
          <label className="font-semibold text-gray-700 mr-4">Trip Type:</label>
          <label className="mr-4">
            <input
              type="radio"
              name="tripType"
              value="oneway"
              checked={tripType === 'oneway'}
              onChange={() => setTripType('oneway')}
            />{' '}
            One-way
          </label>
          <label>
            <input
              type="radio"
              name="tripType"
              value="round"
              checked={tripType === 'round'}
              onChange={() => setTripType('round')}
            />{' '}
            Round-trip
          </label>
        </div>

        {/* From / To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">
              From <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border rounded p-2"
              value={from}
              onChange={e => setFrom(e.target.value)}
              required
            >
              <option value="">Select Departure</option>
              {airports.map(airport => (
                <option key={airport.code} value={airport.code}>
                  {airport.name} ({airport.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">
              To <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border rounded p-2"
              value={to}
              onChange={e => setTo(e.target.value)}
              required
            >
              <option value="">Select Destination</option>
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
                Depart <span className="text-red-500">*</span>
              </span>
            }
            selected={departDate}
            onChange={setDepartDate}
          />
          {tripType === 'round' && (
            <DateInput label="Return" selected={returnDate} onChange={setReturnDate} />
          )}
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-gray-700">Passengers</label>
          <input
            type="number"
            min="1"
            value={passengers}
            onChange={e => setPassengers(Number(e.target.value))}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Search Flights
        </button>
      </form>
    </div>
  )
}

export default HomePage
