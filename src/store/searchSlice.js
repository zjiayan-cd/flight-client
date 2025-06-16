import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tripType: 'oneway',
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  passengers: 1,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetSearchData: () => initialState,
  },
})

export const { setSearchData, resetSearchData } = searchSlice.actions
export default searchSlice.reducer
