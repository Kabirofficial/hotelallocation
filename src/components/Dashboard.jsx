import React, { useState } from 'react';
import { StatsCard } from './StatsCard';
import { RoomGrid } from './RoomGrid';
import { BookingModal } from './BookingModal';
import { GuestDetailsModal } from './GuestDetailsModal';
import { ExportButton } from './ExportButton';
import './Dashboard.css';

export function Dashboard({ activeHotel, stats, roomStatuses, onAddBooking, onRemoveBooking, allBookings }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const currentHotelBookings = allBookings.filter(b => b.hotelId === activeHotel.id);

  return (
    <main className="dashboard-container">
      <header className="dashboard-header animate-fade-in">
        <div className="header-title-group">
          <h1 className="dashboard-title">{activeHotel.name}</h1>
          <p className="dashboard-subtitle">Real-time occupancy management</p>
        </div>
        <div className="header-actions">
          <ExportButton data={currentHotelBookings} hotelName={activeHotel.name} />
        </div>
      </header>

      <StatsCard stats={stats} />

      <section className="grid-section">
        <div className="section-header animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2>Room Allocation Map</h2>
          <div className="legend">
            <span className="legend-item"><div className="dot vacant"></div> Vacant</span>
            <span className="legend-item"><div className="dot occupied"></div> Occupied</span>
          </div>
        </div>
        
        <RoomGrid rooms={roomStatuses} onRoomClick={handleRoomClick} />
      </section>

      {selectedRoom && !selectedRoom.isOccupied && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSubmit={onAddBooking}
        />
      )}

      {selectedRoom && selectedRoom.isOccupied && (
        <GuestDetailsModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onDelete={onRemoveBooking}
        />
      )}
    </main>
  );
}
