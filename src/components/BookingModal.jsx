import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import './BookingModal.css';

export function BookingModal({ room, onClose, onSubmit }) {
  const getDefaultDates = () => {
    let checkIn = '2026-05-15';
    const checkOut = '2026-05-17';
    
    if (room.hotelId === 'rudra' && parseInt(room.id) > 2) {
      checkIn = '2026-05-16';
    }
    return { checkIn, checkOut };
  };

  const defaultDates = getDefaultDates();
  const [guestName, setGuestName] = useState('');
  const [checkIn, setCheckIn] = useState(defaultDates.checkIn);
  const [checkOut, setCheckOut] = useState(defaultDates.checkOut);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !checkIn || !checkOut) return;

    onSubmit({
      roomId: room.id,
      guestName,
      checkIn,
      checkOut,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass animate-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">Check-in Guest</h2>
            <p className="modal-subtitle">Assigning to Room {room.number}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="guestName">Guest Name</label>
            <input
              type="text"
              id="guestName"
              placeholder="e.g. John Doe"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="checkIn">Check-in Date</label>
              <input
                type="date"
                id="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="checkOut">Check-out Date</label>
              <input
                type="date"
                id="checkOut"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary submit-btn">
              <CheckCircle2 size={18} />
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
