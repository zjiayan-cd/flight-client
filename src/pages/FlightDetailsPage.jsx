import React from 'react'
import FlightInfoCard from '../components/FlightInfoCard'

export default function FlightDetails() {
  const outbound = {
    airline: 'Airline A',
    depart: '2025-06-01 08:00',
    arrive: '2025-06-01 12:00',
    duration: '4h',
    from: 'New York (JFK)',
    to: 'Los Angeles (LAX)',
  }

  const returnFlight = {
    airline: 'Airline B',
    depart: '2025-06-10 14:00',
    arrive: '2025-06-10 18:00',
    duration: '4h',
    from: 'Los Angeles (LAX)',
    to: 'New York (JFK)',
  }

  const price = {
    base: 300,
    taxes: 50,
    total: 350,
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">Flight Details</h1>

      <div className="space-y-6">
        <FlightInfoCard title="Outbound Flight" flight={outbound} />
        <FlightInfoCard title="Return Flight" flight={returnFlight} />
      </div>

      {/* Price Summary */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Price Summary</h3>
        <div className="text-sm text-gray-700 mt-2 space-y-1">
          <p>Base Price: <span className="font-medium">${price.base}</span></p>
          <p>Taxes & Fees: <span className="font-medium">${price.taxes}</span></p>
          <p className="text-lg font-bold mt-2">Total: ${price.total}</p>
        </div>
      </section>

      {/* Images */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <img
          src="https://source.unsplash.com/featured/?airplane"
          alt="Flight"
          className="rounded-md shadow"
        />
        <img
          src="https://source.unsplash.com/featured/?airport"
          alt="Airport"
          className="rounded-md shadow"
        />
      </section>

      {/* Submit */}
      <div className="text-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
          Proceed to Payment
        </button>
      </div>
    </main>
  )
}
