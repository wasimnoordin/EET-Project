import './bookingForm.css'
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DatepickerComponent({ selectedDate, handleDateChange }) {
    return (
        <DatePicker
            className='SelectDateCalendar'
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="Pp"
            placeholderText="Select a date"
        />
    );
}

export default DatepickerComponent;