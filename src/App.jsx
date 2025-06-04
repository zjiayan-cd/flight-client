import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
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
import { LoginManagerProvider, useLoginManager } from './context/LoginManagerContext'
import LoginModal from './components/LoginModal'
import { AuthProvider } from './context/AuthContext'
// import { clearSelectedFlights } from './store/selectedFlightSlice'

// const routeWhitelist = [
//   '/flights-return',
//   '/booking-review',
//   '/payment'
// ]

// function RouteWatcher() {
//   const location = useLocation()
//   const dispatch = useDispatch()

//   useEffect(() => {
//     if (!routeWhitelist.includes(location.pathname)) {
//       dispatch(clearSelectedFlights())
//     }
//   }, [location.pathname, dispatch])

//   return null
// }

function AppWithLoginModal() {
  const { loginModalVisible, hideLoginModal } = useLoginManager();

  return (
      loginModalVisible && <LoginModal onClose={hideLoginModal}/>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
      <LoginManagerProvider>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flights" element={<FlightListPage />} />
            <Route path="/flights-return" element={<FlightReturnListPage />} />
            <Route path="/flight" element={<FlightDetailPage />} />
            <Route path="/booking-review" element={<BookingReviewPage />} />
            <Route path="/my-booking" element={<MyBookingsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/regist" element={<RegisterPage />} />
          </Routes>
          <AppWithLoginModal />
        </div>
        </LoginManagerProvider>
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
        style={{ marginTop: '4rem' }}
      />
  </AuthProvider>
  )
}

export default App
