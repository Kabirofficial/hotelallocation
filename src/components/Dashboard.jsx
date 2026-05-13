import React, { useState } from 'react';
import { StatsCard } from './StatsCard';
import { RoomGrid } from './RoomGrid';
import { BookingModal } from './BookingModal';
import { GuestDetailsModal } from './GuestDetailsModal';
import { ExportButton } from './ExportButton';
import './Dashboard.css';

export function Dashboard({ activeHotel, stats, roomStatuses, onAddBooking, onRemoveBooking, allBookings, isLoading }) {
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

      {isLoading ? (
        <div className="skeleton-stats animate-pulse" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: '120px', borderRadius: '1rem', background: 'rgba(255, 255, 255, 0.05)' }}></div>
          ))}
        </div>
      ) : (
        <StatsCard stats={stats} />
      )}

      <section className="grid-section">
        <div className="section-header animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2>Room Allocation Map</h2>
          <div className="legend">
            <span className="legend-item"><div className="dot vacant"></div> Vacant</span>
            <span className="legend-item"><div className="dot occupied"></div> Occupied</span>
          </div>
        </div>
        
        {isLoading ? (
          <div className="skeleton-grid animate-pulse" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
            {Array.from({ length: activeHotel?.totalRooms || 24 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: '0.75rem', background: 'rgba(255, 255, 255, 0.03)' }}></div>
            ))}
          </div>
        ) : (
          <RoomGrid rooms={roomStatuses} onRoomClick={handleRoomClick} />
        )}
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
