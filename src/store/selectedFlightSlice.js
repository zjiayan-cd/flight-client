import { createSlice } from '@reduxjs/toolkit'

const selectedFlightSlice = createSlice({
  name: 'selectedFlight',
  initialState: {
    outboundFlight: null,
    returnFlight: null,
  },
  reducers: {
    setOutboundFlight: (state, action) => {
        state.outboundFlight = action.payload
    },
    setReturnFlight: (state, action) => {
        state.returnFlight = action.payload
    },
    clearSelectedFlights: (state) => {
        state.outboundFlight = null
        state.returnFlight = null
    }
  },
})

export const { setOutboundFlight, setReturnFlight, clearSelectedFlights } = selectedFlightSlice.actions
export default selectedFlightSlice.reducer
