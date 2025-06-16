import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FlightCard from '../components/FlightCard'
import api from '../api'
import { setReturnFlight } from '../store/selectedFlightSlice'
import { formatDate } from '../services/date'

function FlightReturnListPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const search = useSelector(state => state.search)

  const [sortBy, setSortBy] = useState('price')
  const [sortOrder, setSortOrder] = useState('asc')
  const [page, setPage] = useState(0)
  const [size] = useState(3)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchReturnFlights = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await api.searchFlights({
          from: search.to, 
          to: search.from,
          departDate: formatDate(search.returnDate),
          passengers: search.passengers,
          page,
          size,
          sortBy,
          sortOrder,
        })
        setFlights(res.data.data.flights)
        setTotalPages(res.data.data.total)
      } catch (err) {
        console.log("err:", err)
        setError('Failed to load return flights.')
      } finally {
        setLoading(false)
      }
    }

    fetchReturnFlights()
  }, [search, sortBy, sortOrder, page])

  const handleSelect = (flight) => {
    dispatch(setReturnFlight(flight))
    navigate('/flight')
  }

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(key)
      setSortOrder('asc')
    }
    setPage(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 py-10 pt-20">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Select Your Return Flight</h2>
      
      {flights.length > 0 && (
      <div className="flex gap-4 text-sm">
            <button onClick={() => toggleSort('price')} className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              Price
              {sortBy === 'price' && (sortOrder === 'asc' ? 
              (<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>) : 
              (<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>)
              )}
            </button>
            <button onClick={() => toggleSort('departureTime')} className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              Departure
              {sortBy === 'departureTime' && (sortOrder === 'asc' ? 
              (<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>) : 
              (<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>)
              )}
            </button>
          </div>
      )}
      </div>  
      
      {/* {loading && <p>Loading...</p>} */}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && flights.length === 0 && (
            <div className="text-center text-gray-600">
                <p>No return flights found for the selected criteria.</p>
                <div className="mt-4 flex justify-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
                >
                    Back to Home
                </button>

                <button
                    onClick={() => {
                    // 修改为单程
                    dispatch({ type: 'search/setSearchData', payload: { ...search, tripType: 'oneway', returnDate: '' } })
                    navigate('/flight') // 直接进入详情页，只显示去程
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 font-medium"
                >
                    Book One-way Instead
                </button>
                </div>
            </div>
        )}

      <div className="relative">
        <div className={`${loading ? 'opacity-40' : 'opacity-100'} space-y-4 transition-all duration-300 ease-in-out`}>
          {flights.map(flight => (
            <FlightCard
              key={flight.id}
              flight={flight}
              showSelectBtn={true}
              onSelect={() => handleSelect(flight)}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {flights.length > 0 && (
      <div className="flex justify-center mt-6 gap-2">
          <button
            className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
          >
            Prev
          </button>
          <span className="text-sm px-2 pt-1">
            Page {page + 1} of {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page + 1 >= totalPages}
          >
            Next
          </button>
        </div>
        )}  

    </div>
    </div>
  )
}

export default FlightReturnListPage
