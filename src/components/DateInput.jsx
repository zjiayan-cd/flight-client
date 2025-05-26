import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Tailwind-friendly custom style wrapper
const DateInput = ({ label, selected, onChange, placeholder = "Select date" }) => {
  return (
    <div>
      {label && <label className="block text-gray-700 mb-1">{label}</label>}
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder}
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        popperPlacement="bottom"
      />
    </div>
  )
}

export default DateInput
