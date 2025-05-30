import React, { useState, useEffect } from 'react'
import FlightCard from '../components/FlightCard'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function MyBookingPage() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      api.bookings()
        .then(res => {
          setBookings(res.data)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setError("Failed to load bookings.")
          setLoading(false)
        })
    }
  }, [token])

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your bookings</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Log In
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  const upcoming = bookings.filter(b => new Date(b.flight.departureTime) > new Date())
  const past = bookings.filter(b => new Date(b.flight.departureTime) <= new Date())

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {/* Upcoming Trips */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Upcoming Trips</h2>
        {upcoming.length > 0 ? (
          <div className="space-y-4">
            {upcoming.map((booking, idx) => (
              <FlightCard key={idx} flight={booking.flight} showSelectBtn={false} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no upcoming trips.</p>
        )}
      </section>

      {/* Past Trips */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Past Trips</h2>
        {past.length > 0 ? (
          <div className="space-y-4">
            {past.map((booking, idx) => (
              <FlightCard key={idx} flight={booking.flight} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no past trips.</p>
        )}
      </section>
    </div>
  )
}

export default MyBookingPage
