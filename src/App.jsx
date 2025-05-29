import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MyBookingsPage from './pages/MyBookingsPage'
import RegisterPage from './pages/RegisterPage'
import FlightListPage from './pages/FlightListPage'
import FlightReturnListPage from './pages/FlightReturnListPage'
import FlightDetailPage from './pages/FlightDetailsPage'
import BookingReviewPage from './pages/BookingReviewPage'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'

function App() {
  const [user, setUser] = useState(null)
  const handleLogout = () => {
    setUser(null)
  }
  return (
    <>
      <Router>
        <Navbar user={user} onLogout={handleLogout} />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flights" element={<FlightListPage />} />
            <Route path="/flights-return" element={<FlightReturnListPage />} />
            <Route path="/flight" element={<FlightDetailPage />} />
            <Route path="/booking-review" element={<BookingReviewPage />} />
            <Route path="/my-booking" element={<MyBookingsPage user={user} />} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />
            <Route path="/regist" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  </>
  )
}

export default App
