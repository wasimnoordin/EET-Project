import React, { Component } from "react";
import "./OfficeMaps.css";

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

  isSeatBooked = (seatId) => {
    return this.state.bookedSeats.includes(seatId);
  };

  render() {
    const seats = [
      { id: "seat1", className: "seat1",  },
      { id: "seat2", className: "seat2",  },
      { id: "seat3", className: "seat3" },
      // Add more seats as needed
    ];

    const seatDots = seats.map(seat => {
      const isBooked = this.isSeatBooked(seat.id);
      const className = `seat-dot ${seat.className} ${isBooked ? 'booked' : ''}`;

      return (
      

        <button
          key={seat.id}
          className={className}
          style={{ top: seat.top, left: seat.left }}
          onClick={() => this.handleSeatClick(seat.id)}
          disabled={isBooked} // Disable booking if already booked
        >
          {seat.id}
        </button>
      );
    });

    return (
      <div className="seat-map">
        {seatDots}
        {this.state.popupVisible && (
          <div className="popup">
            <p>Selected seat: {this.state.selectedSeat}</p>
            <button className="confirmBut" onClick={this.handleConfirmReservation}>
              Confirm reservation
            </button>
            <button className="cancelBut" onClick={() => this.setState({ popupVisible: false })}>
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }
}
