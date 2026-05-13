import React from 'react';
import './RoomGrid.css';

export function RoomGrid({ rooms, onRoomClick }) {
  return (
    <div className="room-grid animate-fade-in">
      {rooms.map((room, index) => (
        <button
          key={room.id}
          className={`room-cell ${room.isOccupied ? 'occupied' : 'vacant'}`}
          onClick={() => onRoomClick(room)}
          style={{ animationDelay: `${index * 0.02}s` }}
        >
          <div className="room-number">{room.number}</div>
          <div className="room-status-indicator" />
          {room.isOccupied && room.booking && (
            <div className="guest-name" title={room.booking.guestName}>
              {room.booking.guestName}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
