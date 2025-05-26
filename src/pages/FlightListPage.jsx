import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const sampleFlights = [
  {
    id: 1,
    airline: 'Air Asia',
    flightNumber: 'AK123',
    airlineLogo: 'https://via.placeholder.com/40',
    departure: 'Beijing',
    arrival: 'Shanghai',
    departureTime: '08:00',
    arrivalTime: '10:30',
    duration: '2h 30m',
    stops: 0,
    price: 120,
  },
  {
    id: 2,
    airline: 'China Southern',
    flightNumber: 'CZ456',
    airlineLogo: 'https://via.placeholder.com/40',
    departure: 'Beijing',
    arrival: 'Shanghai',
    departureTime: '12:00',
    arrivalTime: '14:00',
    duration: '2h',
    stops: 0,
    price: 160,
  },
]

function FlightListPage() {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState('price')
  const [sortOrder, setSortOrder] = useState('asc')

  const sortedFlights = [...sampleFlights].sort((a, b) => {
    let valA = a[sortBy]
    let valB = b[sortBy]

    if (sortBy === 'duration') {
      // 按时长排序（格式类似 "2h 30m"）
      const toMinutes = (dur) => {
        const match = dur.match(/(\d+)h\s*(\d+)?m?/)
        return match ? parseInt(match[1]) * 60 + (parseInt(match[2]) || 0) : 0
      }
      valA = toMinutes(valA)
      valB = toMinutes(valB)
    } else if (sortBy === 'departureTime') {
      valA = parseInt(valA.replace(':', ''))
      valB = parseInt(valB.replace(':', ''))
    }

    return sortOrder === 'asc' ? valA - valB : valB - valA
  })

  const handleSelect = (flight) => {
    navigate(`/flight/${flight.id}`, { state: { flight } })
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Available Flights</h2>

      {/* 排序选择 */}
      <div className="mb-4 flex gap-4 items-center">
        <label className="text-gray-600">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="price">Price</option>
          <option value="departureTime">Time</option>
          <option value="duration">Duration</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="asc">Ascending ↑</option>
          <option value="desc">Descending ↓</option>
        </select>
      </div>

      {/* 航班列表表格 */}
      <div className="overflow-x-auto shadow rounded">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-3 text-left">Airline</th>
              <th className="p-3 text-left">Departure</th>
              <th className="p-3 text-left">Arrival</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Stops</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sortedFlights.map((flight) => (
              <tr
                key={flight.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={flight.airlineLogo}
                    alt={flight.airline}
                    className="w-6 h-6"
                  />
                  <span>{flight.airline}</span>
                </td>
                <td className="p-3">
                  {flight.departure} <br />
                  <span className="text-xs text-gray-500">
                    {flight.departureTime}
                  </span>
                </td>
                <td className="p-3">
                  {flight.arrival} <br />
                  <span className="text-xs text-gray-500">
                    {flight.arrivalTime}
                  </span>
                </td>
                <td className="p-3">{flight.duration}</td>
                <td className="p-3">{flight.stops}</td>
                <td className="p-3 font-semibold text-blue-600">
                  ${flight.price}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleSelect(flight)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FlightListPage
