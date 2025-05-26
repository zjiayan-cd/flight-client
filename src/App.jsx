import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MyBookingsPage from './pages/MyBookingsPage'
import RegisterPage from './pages/RegisterPage'
import FlightListPage from './pages/FlightListPage'
import ReturnFlightList from './pages/ReturnFlightList'
import FlightDetails from './pages/FlightDetailsPage'
import Navbar from './components/Navbar'

function App() {
  const [user, setUser] = useState(null)
  const handleLogout = () => {
    setUser(null)
  }
  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightListPage />} />
          <Route path="/return-flights" element={<ReturnFlightList />} />
          <Route path="/details" element={<FlightDetails />} />
          <Route path="/my-booking" element={<MyBookingsPage user={user} />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
