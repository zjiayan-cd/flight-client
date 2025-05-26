import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const dummyFlights = [
  {
    id: 1,
    airline: '✈️ Airline A',
    departure: '2025-06-01 10:00',
    arrival: '2025-06-01 13:00',
    duration: '3h',
    stops: 'Non-stop',
    price: '$150',
  },
  {
    id: 2,
    airline: '🛩️ Airline B',
    departure: '2025-06-01 12:00',
    arrival: '2025-06-01 16:00',
    duration: '4h',
    stops: '1 stop',
    price: '$120',
  },
]

export default function ReturnFlightList() {
  const navigate = useNavigate()
  const [sortKey, setSortKey] = useState('price')
  const [sortOrder, setSortOrder] = useState('asc')

  const sortedFlights = [...dummyFlights].sort((a, b) => {
    const aVal = sortKey === 'price' ? parseInt(a[sortKey].replace('$', '')) : a[sortKey]
    const bVal = sortKey === 'price' ? parseInt(b[sortKey].replace('$', '')) : b[sortKey]
    return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 面包屑 */}
      <nav className="text-sm mb-4 text-gray-500">
        Home / Flights / <span className="text-blue-600">Select Return Flight</span>
      </nav>

      <h1 className="text-2xl font-bold mb-4">Select your return flight</h1>

      {/* 排序控制 */}
      <div className="flex gap-4 mb-4">
        <label>
          Sort by:{' '}
          <select value={sortKey} onChange={e => setSortKey(e.target.value)} className="border rounded px-2 py-1">
            <option value="price">Price</option>
            <option value="departure">Departure</option>
            <option value="duration">Duration</option>
          </select>
        </label>
        <label>
          Order:{' '}
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="border rounded px-2 py-1">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {/* 航班表格 */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Airline</th>
              <th className="p-2 border">Departure</th>
              <th className="p-2 border">Arrival</th>
              <th className="p-2 border">Duration</th>
              <th className="p-2 border">Stops</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedFlights.map(flight => (
              <tr key={flight.id}>
                <td className="p-2 border">{flight.airline}</td>
                <td className="p-2 border">{flight.departure}</td>
                <td className="p-2 border">{flight.arrival}</td>
                <td className="p-2 border">{flight.duration}</td>
                <td className="p-2 border">{flight.stops}</td>
                <td className="p-2 border">{flight.price}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => navigate('/flight-details')}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页器（占位） */}
      <div className="mt-6 flex justify-center gap-2">
        <button className="px-3 py-1 border rounded">1</button>
        <button className="px-3 py-1 border rounded">2</button>
        <button className="px-3 py-1 border rounded">3</button>
      </div>
    </div>
  )
}
