import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchSlice'
import selectedFlightReducer from './selectedFlightSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    selectedFlight: selectedFlightReducer,
  },
})
