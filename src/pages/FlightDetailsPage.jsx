import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function FlightDetailPage() {
  const { outboundFlight, returnFlight } = useSelector(state => state.selectedFlight)
  const passengers = useSelector(state => state.search.passengers)
  const navigate = useNavigate()

  if (!outboundFlight) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <p className="text-red-500">No flight selected.</p>
        <button
          onClick={() => navigate('/flights')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Flights
        </button>
      </div>
    )
  }

  const calcFare = (flight) => {
    const base = flight.price
    const tax = Math.round(base * 0.1)
    return { base, tax, total: base + tax }
  }

  const outboundFare = calcFare(outboundFlight)
  const returnFare = returnFlight ? calcFare(returnFlight) : { base: 0, tax: 0, total: 0 }

  const totalFare = {
    base: outboundFare.base + returnFare.base,
    tax: outboundFare.tax + returnFare.tax,
    total: outboundFare.total + returnFare.total,
  }

  const renderFlightSegment = (title, flight) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-gray-800 font-medium">
            {flight.departure} → {flight.arrival}
          </div>
          <div className="text-gray-500 text-sm">
            {flight.departureTime} - {flight.arrivalTime}
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold">{flight.airline} ({flight.flightNumber})</div>
          {/* <div className="text-sm text-gray-500">{flight.duration}, {flight.stops} stop(s)</div> */}
          <div className="text-sm text-gray-500">{flight.duration}, 0 stop(s)</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
        {/* 面包屑导航 */}
        <div className="text-sm text-gray-500 mb-4">
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Home</span>
          {' / '}
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/flights')}>Flights</span>
          {' / '}
          <span className="text-gray-700 font-medium">Confirmation</span>
        </div>

        <h2 className="text-2xl font-bold mb-6">Flights Details</h2>

        {/* 航班段展示 */}
        {renderFlightSegment('Outbound', outboundFlight)}
        {returnFlight && renderFlightSegment('Return', returnFlight)}

        {/* Fare Summary */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Fare Summary (per passenger)</h3>

          <div className="space-y-4 text-sm">
            {/* Outbound */}
            <div>
              <div className="font-medium text-gray-800 mb-1">Outbound Flight</div>
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span>¥{outboundFare.base.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>¥{outboundFare.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-blue-600">¥{outboundFare.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Return */}
            {returnFlight && (
              <div>
                <div className="font-medium text-gray-800 mb-1 mt-4">Return Flight</div>
                <div className="flex justify-between">
                  <span>Base Fare</span>
                  <span>¥{returnFare.base.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>¥{returnFare.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">¥{returnFare.total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between border-t pt-3 font-bold text-base">
              <span>Total per passenger</span>
              <span className="text-blue-700">¥{totalFare.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Book 按钮 */}
        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate('/booking-review')}
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default FlightDetailPage
