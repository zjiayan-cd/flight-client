import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { showError } from '../services/toast'
import { useLoginManager } from '../context/LoginManagerContext'
import { useAuth } from '../context/AuthContext'

function BookingReviewPage() {
  const navigate = useNavigate()
  const { outboundFlight, returnFlight } = useSelector(state => state.selectedFlight)
  const passengersCount = useSelector(state => state.search.passengers)
  const [passengerInfo, setPassengerInfo] = useState(
    Array(passengersCount).fill({ name: '', idNumber: '' })
  )
  const [showSuccess, setShowSuccess] = useState(false)
  const [reference, setReference] = useState('')
  const { showLoginModal } = useLoginManager()

  const { user } = useAuth()

  const handleChange = (index, field, value) => {
    const updated = [...passengerInfo]
    updated[index] = { ...updated[index], [field]: value }
    setPassengerInfo(updated)
  }

  const calcFare = (flight) => {
    const base = flight.price
    const tax = Math.round(base * 0.1)
    return { base, tax, total: base + tax }
  }

  const outboundFare = calcFare(outboundFlight)
  const returnFare = returnFlight ? calcFare(returnFlight) : { base: 0, tax: 0, total: 0 }
  const totalPerPassenger = outboundFare.total + returnFare.total
  const totalAll = totalPerPassenger * passengersCount

  const handleSubmit = async () => {
    for (const [i, p] of passengerInfo.entries()) {
      if (!p.name || !p.idNumber) {
        showError(`Passenger ${i + 1} info is incomplete.`)
        return
      }
    }

    const token = localStorage.getItem("token")
    console.log('[BookingReviewPage]token:', token)
    if (!token || !user) {
      showLoginModal()
      return
    }

    try {
      const bookings = []
  
      // 出发航班订单
      bookings.push({
        flightId: outboundFlight.id,
        passengers: passengerInfo
      })
  
      // 返程航班订单（如果有）
      if (returnFlight) {
        bookings.push({
          flightId: returnFlight.id,
          passengers: passengerInfo
        })
      }
      console.log('[BookingReviewPage] user before:')
      console.log('[BookingReviewPage] user:', user)
      const res = await api.booking({
        username: user.username,
        bookings
      })
  console.log('[BookingReviewPage] res.data :', res.data)
      // 假设返回多个 reference，展示第一个
      setReference(res.data.data[0].reference || 'N/A')
      setShowSuccess(true)
    } catch (err) {
      console.log(err?.response)
     
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.status === 403
        ? 'You need to login first'
        : err?.message || 
          'Booking failed. Please try again'
      showError(msg)
    }
  }  

  const handleClose = () => {
    setShowSuccess(false)
    navigate('/my-booking')
  }

  const renderFlightSegment = (title, flight) => (
    <div className="mb-4">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
        <div className="mb-1 sm:mb-0 truncate">
          {flight.departure} → {flight.arrival}
        </div>
        <div className="text-left sm:text-right whitespace-nowrap">
          {flight.departureTime} - {flight.arrivalTime}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between text-sm mt-1 text-gray-600">
        <span>{flight.airline} ({flight.flightNumber})</span>
        {/* <span>{flight.duration}, {flight.stops} stop(s)</span> */}
        <span>0 stop(s)</span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-6 ">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <span className="cursor-pointer hover:underline" onClick={() => navigate('/')}>Home</span>
          {' / '}
          <span className="cursor-pointer hover:underline" onClick={() => navigate('/flight')}>Confirmation</span>
          {' / '}
          <span className="text-gray-700 font-medium">Review & Submit</span>
        </div>

        <h2 className="text-2xl font-bold mb-6">Booking Review</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左列：航班 + 总价 */}
          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Flight Information</h3>
            {renderFlightSegment('Outbound', outboundFlight)}
            {returnFlight && renderFlightSegment('Return', returnFlight)}

            <div className="mt-6 border-t pt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Fare Summary</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Passengers</span>
                  <span>{passengersCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Fare x{passengersCount}</span>
                  <span>¥{(outboundFare.base + returnFare.base) * passengersCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax x{passengersCount}</span>
                  <span>¥{(outboundFare.tax + returnFare.tax) * passengersCount}</span>
                </div>
                <div className="flex justify-between font-bold text-blue-600 border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>¥{totalAll.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右列：乘客表单 */}
          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Passenger Information</h3>
            <div className="space-y-4">
              {passengerInfo.map((p, i) => (
                <div key={i} className="border-b pb-4">
                  <div className="font-medium text-gray-700 mb-2">Passenger {i + 1} <span className="text-red-500">*</span></div>
                  <input
                    className="w-full border px-3 py-2 rounded mb-2"
                    placeholder="Full Name"
                    value={p.name}
                    onChange={e => handleChange(i, 'name', e.target.value)}
                  />
                  <input
                    className="w-full border px-3 py-2 rounded"
                    placeholder="ID Number"
                    value={p.idNumber}
                    onChange={e => handleChange(i, 'idNumber', e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
            >
              Continue to payment
            </button>
          </div>
        </div>
      </div>

      {/* 预定成功弹框 */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
            <p className="mb-2">Your booking reference:</p>
            <p className="font-mono text-lg text-gray-800 mb-4">{reference}</p>
            <button
              onClick={handleClose}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
            >
              View My Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingReviewPage
