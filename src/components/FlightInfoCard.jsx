import React from 'react'

export default function FlightInfoCard({ title, flight }) {
  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-2">
      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-600">
        <p><span className="font-medium">Airline:</span> {flight.airline}</p>
        <p><span className="font-medium">From:</span> {flight.from}</p>
        <p><span className="font-medium">Departure:</span> {flight.depart}</p>
        <p><span className="font-medium">To:</span> {flight.to}</p>
        <p><span className="font-medium">Arrival:</span> {flight.arrive}</p>
        <p><span className="font-medium">Duration:</span> {flight.duration}</p>
      </div>
    </section>
  )
}
