import React, { Component } from "react";
import "./OfficeMaps.css";
import SeatConfirmationPopup from "./SeatConfimPopup";
export default class OfficeMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      selectedSeat: null,
      bookedSeats: [] // Track booked seats
    };
  }

  handleSeatClick = (seatId) => {
    this.setState({
      popupVisible: true,
      selectedSeat: seatId
    });
  };

  handleConfirmReservation = () => {
    this.setState(prevState => ({
      bookedSeats: [...prevState.bookedSeats, this.state.selectedSeat],
      popupVisible: false // Hide the pop-up after confirming reservation
    }));
  };

  handleCancelReservation = () => {
    this.setState({ popupVisible: false });
  };

  isSeatBooked = (seatId) => {
    return this.state.bookedSeats.includes(seatId);
  };

  render() {
    const seats = [
      { id: "seat1", className: "seat1" },
      { id: "seat2", className: "seat2" },
      { id: "seat3", className: "seat3" }
      // Add more seats as needed
    ];

    const seatDots = seats.map(seat => {
      const isBooked = this.isSeatBooked(seat.id);
      const className = `seat-dot ${seat.className} ${isBooked ? 'booked' : ''}`;

      return (
        <button
          key={seat.id}
          className={className}
          onClick={() => this.handleSeatClick(seat.id)}
          disabled={isBooked} // Disable booking if already booked
        >
          {seat.id}
        </button>
      );
    });

    return (
      <div>
        {seatDots}
        {this.state.popupVisible && (
          <SeatConfirmationPopup
            selectedSeat={this.state.selectedSeat}
            onConfirm={this.handleConfirmReservation}
            onCancel={this.handleCancelReservation}
          />
        )}
      </div>
    );
  }
}