import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FlightCard from '../components/FlightCard'
import api from '../api'
import { setReturnFlight } from '../store/selectedFlightSlice'

function FlightReturnListPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const search = useSelector(state => state.search)

  useEffect(() => {
    const fetchReturnFlights = async () => {
      setLoading(true)
      try {
        const res = await api.searchFlights({
          from: search.to, 
          to: search.from,
          depart: search.returnDate,
          passengers: search.passengers,
        })
        setFlights(res.data)
      } catch (err) {
        setError('Failed to load return flights.')
      } finally {
        setLoading(false)
      }
    }

    fetchReturnFlights()
  }, [search])

  const handleSelect = (flight) => {
    dispatch(setReturnFlight(flight))
    navigate('/flight')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Select Your Return Flight</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && flights.length === 0 && (
            <div className="text-center mt-6 text-gray-600">
                <p>No return flights found for the selected criteria.</p>
                <div className="mt-4 flex justify-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Back to Home
                </button>

                <button
                    onClick={() => {
                    // 修改为单程
                    dispatch({ type: 'search/setSearchData', payload: { ...search, tripType: 'oneway', returnDate: '' } })
                    navigate('/flight') // 直接进入详情页，只显示去程
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Book One-way Instead
                </button>
                </div>
            </div>
        )}

      
      {flights.map(f => (
        <FlightCard key={f.id} flight={f} onSelect={() => handleSelect(f)} showSelectBtn={true} />
      ))}
    </div>
  )
}

export default FlightReturnListPage
