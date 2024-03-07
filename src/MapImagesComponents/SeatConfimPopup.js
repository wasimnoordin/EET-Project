import React, { Component } from "react";
import "./OfficeMaps.css";

class SeatConfirmationPopup extends Component {
  render() {
    return (
      <div className="popup">
        <p>Selected seat: {this.props.selectedSeat}</p>
        <button className="confirmBut" onClick={this.props.onConfirm}>
          Confirm reservation
        </button>
        <button className="cancelBut" onClick={this.props.onCancel}>
          Cancel
        </button>
      </div>
    );
  }
}
export default SeatConfirmationPopup;