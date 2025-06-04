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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Available Flights</h2>

      {loading && <p className="text-gray-600">Loading flights...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && flights.length === 0 && (
        <p className="text-gray-500">No flights found for the selected criteria.</p>
      )}

      <div className="space-y-4">
        {flights.map(flight => (
          <FlightCard key={flight.id} flight={flight} showSelectBtn={true} onSelect={() => handleSelect(flight)} />
        ))}
      </div>
    </div>
  )
}

export default FlightListPage
