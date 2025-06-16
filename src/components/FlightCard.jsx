import React from 'react'
import { formatDate } from '../services/date'

function FlightCard({ flight, onSelect, showSelectBtn }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded p-4 shadow-sm bg-white hover:shadow-md transition space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex items-center gap-4 flex-shrink-0 w-fll sm:w-[160px] mb-2 sm:mb-0">
        <img src={`/flights/${flight.flightNumber}.png`} 
          onError={(e) => e.currentTarget.src = '/flights/default.png'}
          alt={flight.flightNumber} className="w-10 h-10 object-contain" />
        <div className="truncate">
          <div className="font-semibold text-sm sm:text-base truncate">{flight.airline}</div>
          <div className="text-xs text-gray-500 truncate">{flight.flightNumber}</div>
        </div>
      </div>

      <div className="flex justify-between sm:justify-start sm:flex-1 sm:gap-12 text-sm text-left mb-2 sm:mb-0">
        <div className='w-[120px]'>
          <div className="font-medium text-sm sm:text-base">{flight.departure}</div>
          <div className="text-xs text-gray-500">{formatDate(flight.departureTime)}</div>
        </div>       
        <div className="w-[120px]">
          <div className="font-medium text-sm sm:text-base">{flight.arrival}</div>
          <div className="text-xs text-gray-500">{formatDate(flight.arrivalTime)}</div>
        </div>
      </div>

      <div className="text-left w-[100px]">
        <div className="text-sm">{flight.duration}</div>
        {/* <div className="text-xs text-gray-500">{flight.stops} stops</div> */}
        <div className="text-xs text-gray-500">0 stops</div>
      </div>

      <div className="flex justify-between sm:block sm:w-[120px] text-right items-end">
        <div className="text-lg font-bold text-blue-600 whitespace-nowrap">¥{flight.price}</div>
        {showSelectBtn && <button
          onClick={() => onSelect(flight)}
          className="ml-4 sm:ml-0 mt-1 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Select
        </button>}
      </div>
    </div>
  )
}

export default FlightCard
