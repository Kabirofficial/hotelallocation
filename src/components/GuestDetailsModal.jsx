import React from 'react';
import { X, Trash2 } from 'lucide-react';
import './BookingModal.css'; // Reuse styles

export function GuestDetailsModal({ room, onClose, onDelete }) {
  const { booking } = room;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${booking.guestName} from Room ${room.number}?`)) {
      onDelete(booking.id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass animate-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">Room {room.number}</h2>
            <p className="modal-subtitle" style={{ color: 'var(--status-occupied)' }}>Occupied</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-form">
          <div className="form-group">
            <label>Guest Name</label>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{booking.guestName}</div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Check-in Date</label>
              <div>{booking.checkIn}</div>
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <div>{booking.checkOut}</div>
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: '2rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Close
            </button>
            <button 
              type="button" 
              className="btn btn-primary submit-btn" 
              onClick={handleDelete}
              style={{ background: 'var(--status-occupied)', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)' }}
            >
              <Trash2 size={18} />
              Remove Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
