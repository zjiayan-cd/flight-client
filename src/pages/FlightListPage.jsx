import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FlightCard from '../components/FlightCard'
import { useSelector } from 'react-redux'
import api from '../api'
import { useDispatch } from 'react-redux'
import { clearSelectedFlights, setOutboundFlight } from '../store/selectedFlightSlice'
import { formatDate } from '../services/date'

function FlightListPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('price')
  const [sortOrder, setSortOrder] = useState('asc')
  const [error, setError] = useState(null)

  const search = useSelector(state => state.search)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearSelectedFlights())
  }, [])

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true)
      setError(null)

      try {
        console.log('[DEBUG] Sending request...', search)

        const response = await api.searchFlights({
          tripType: search.tripType,
          from: search.from,
          to: search.to,
          departDate: formatDate(search.departDate),
          returnDate: search.tripType === 'round' ? formatDate(search.returnDate) : undefined,
          passengers: search.passengers,
        })
        console.log('[DEBUG] Response:', response)
        setFlights(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load flights')
      } finally {
        setLoading(false)
      }
    }

    fetchFlights()
  }, [search])

  // const sortedFlights = [...sampleFlights].sort((a, b) => {
  //   let valA = a[sortBy]
  //   let valB = b[sortBy]

  //   if (sortBy === 'duration') {
  //     // 按时长排序（格式类似 "2h 30m"）
  //     const toMinutes = (dur) => {
  //       const match = dur.match(/(\d+)h\s*(\d+)?m?/)
  //       return match ? parseInt(match[1]) * 60 + (parseInt(match[2]) || 0) : 0
  //     }
  //     valA = toMinutes(valA)
  //     valB = toMinutes(valB)
  //   } else if (sortBy === 'departureTime') {
  //     valA = parseInt(valA.replace(':', ''))
  //     valB = parseInt(valB.replace(':', ''))
  //   }

  //   return sortOrder === 'asc' ? valA - valB : valB - valA
  // })

  const handleSelect = (flight) => {
      dispatch(setOutboundFlight(flight))

      if(search.tripType == 'round'){
        navigate('/flights-return')
      }else{
        navigate('/flight')
      }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 py-10 pt-20">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Available Flights</h2>

      {loading && <p className="text-center text-gray-600">Loading flights...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && flights.length === 0 && (
        <p className="text-center text-gray-500">No flights found for the selected criteria.</p>
      )}

      <div className="space-y-4">
        {flights.map(flight => (
          <FlightCard key={flight.id} flight={flight} showSelectBtn={true} onSelect={() => handleSelect(flight)} />
        ))}
      </div>
      </div>
    </div>
  )
}

export default FlightListPage
