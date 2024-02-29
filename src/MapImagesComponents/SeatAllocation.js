import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import "./OfficeMaps.css"; // Assuming you have a CSS file named OfficeMaps.css

export default class OfficeMaps extends Component {
  addSeatCallback = ({ row, number, id }, addCb) => {
    this.props.setSelected(`Added seat ${number}, row ${row}, id ${id}`);
    const newTooltip = `tooltip for id-${id} added by callback`;
    addCb(row, number, id, newTooltip);
  };

  render() {
    const rows = [
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you", style: { top: '10px', left: '10px' }, className: "seat-dot" },
        { id: 2, number: 2, tooltip: "Reserved by Jon James", style: { top: '20px', left: '20px' }, className: "seat-dot" },
        null,
        {
          id: 3,
          number: "3",
          isReserved: true,
          orientation: "east",
          tooltip: "Reserved by Rogger",
          style: { top: '30px', left: '30px' },
          className: "seat-dot"
        },
        { id: 4, number: "4", orientation: "west", style: { top: '40px', left: '40px' }, className: "seat-dot" },
        null,
        { id: 5, number: 5, style: { top: '50px', left: '50px' }, className: "seat-dot" },
        { id: 6, number: 6, style: { top: '60px', left: '60px' }, className: "seat-dot" }
      ]
    ];

    return (
      <div>
        <SeatPicker
          addSeatCallback={this.addSeatCallback}
          rows={rows}
          maxReservableSeats={3}
          alpha
          visible
          selectedByDefault
          loading={false}
          tooltipProps={{ multiline: true }}
        />
      </div>
    );
  }
}
