import React from 'react'
import { formatDate } from '../services/date'

function FlightCard({ flight, onSelect, showSelectBtn }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded p-4 shadow-sm bg-white hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img src={`/flights/${flight.flightNumber}.png`} 
          onError={(e) => e.currentTarget.src = '/flights/default.png'}
          alt={flight.flightNumber} className="w-10 h-10 object-contain" />
        <div>
          <div className="font-semibold text-sm sm:text-base">{flight.airline}</div>
          <div className="text-xs text-gray-500">{flight.flightNumber}</div>
        </div>
      </div>

      <div className="text-left pt-6 sm:pt-0">
        <div className="font-medium text-sm sm:text-base">{flight.departure}</div>
        <div className="text-xs text-gray-500">{formatDate(flight.departureTime)}</div>
      </div>

      <div className="text-left pt-6 sm:pt-0">
        <div className="font-medium text-sm sm:text-base">{flight.arrival}</div>
        <div className="text-xs text-gray-500">{formatDate(flight.arrivalTime)}</div>
      </div>

      <div className="text-left pt-6 sm:pt-0">
        <div className="text-sm">{flight.duration}</div>
        {/* <div className="text-xs text-gray-500">{flight.stops} stops</div> */}
        <div className="text-xs text-gray-500">0 stops</div>
      </div>

      <div className="text-right">
        <div className="text-lg font-bold text-blue-600">¥{flight.price}</div>
        {showSelectBtn && <button
          onClick={() => onSelect(flight)}
          className="mt-1 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Select
        </button>}
      </div>
    </div>
  )
}

export default FlightCard
