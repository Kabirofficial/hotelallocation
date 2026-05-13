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
            <>
              <div className="guest-name">
                {room.booking.guestName}
              </div>
              <div className="custom-tooltip glass">
                <strong>{room.booking.guestName}</strong>
                {room.booking.memberCount > 1 && <span> (+{room.booking.memberCount - 1})</span>}
                <div style={{ fontSize: '0.7rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                  {room.booking.checkIn} to {room.booking.checkOut}
                </div>
              </div>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
