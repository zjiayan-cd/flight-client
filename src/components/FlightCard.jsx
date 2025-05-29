import React from 'react'

function FlightCard({ flight, onSelect }) {
  return (
    <div className="flex items-center justify-between border rounded p-4 shadow-sm bg-white hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img src={`/flights/${flight.flightNumber}.png`} 
          onError={(e) => e.currentTarget.src = '/flights/default.png'}
          alt={flight.flightNumber} className="w-12 h-12" />
        <div>
          <div className="font-semibold">{flight.airline}</div>
          <div className="text-sm text-gray-500">{flight.flightNumber}</div>
        </div>
      </div>

      <div className="text-center">
        <div className="font-medium">{flight.departure}</div>
        <div className="text-sm text-gray-500">{flight.departureTime}</div>
      </div>

      <div className="text-center">
        <div className="font-medium">{flight.arrival}</div>
        <div className="text-sm text-gray-500">{flight.arrivalTime}</div>
      </div>

      <div className="text-center">
        <div className="text-sm">{flight.duration}</div>
        <div className="text-xs text-gray-500">{flight.stops} stops</div>
      </div>

      <div className="text-right">
        <div className="text-lg font-bold text-blue-600">¥{flight.price}</div>
        <button
          onClick={() => onSelect(flight)}
          className="mt-1 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Select
        </button>
      </div>
    </div>
  )
}

export default FlightCard
