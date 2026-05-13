import React, { useState } from 'react';
import { X, Trash2, Users, AlertTriangle } from 'lucide-react';
import './BookingModal.css'; // Reuse styles

export function GuestDetailsModal({ room, onClose, onDelete }) {
  const { booking } = room;
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(booking.id);
    onClose();
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
            <label>Primary Guest</label>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{booking.guestName}</div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Number of Guests</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={16} style={{ color: 'var(--text-secondary)' }} />
                <span>{booking.memberCount || 1}</span>
              </div>
            </div>
          </div>

          {booking.memberNames && (
            <div className="form-group">
              <label>Additional Members</label>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                {booking.memberNames}
              </div>
            </div>
          )}

          <div className="form-row" style={{ marginTop: '0.5rem' }}>
            <div className="form-group">
              <label>Check-in</label>
              <div>{booking.checkIn}</div>
            </div>
            <div className="form-group">
              <label>Check-out</label>
              <div>{booking.checkOut}</div>
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: '2rem' }}>
            {!showConfirm ? (
              <>
                <button type="button" className="btn btn-outline" onClick={onClose}>
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary submit-btn" 
                  onClick={() => setShowConfirm(true)}
                  style={{ background: 'var(--status-occupied)', boxShadow: '0 4px 15px rgba(225, 29, 72, 0.3)' }}
                >
                  <Trash2 size={18} />
                  Remove Booking
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', justifyContent: 'space-between', background: 'rgba(225, 29, 72, 0.1)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(225, 29, 72, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-occupied)' }}>
                  <AlertTriangle size={18} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Are you sure?</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setShowConfirm(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" style={{ background: 'var(--status-occupied)', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={handleDelete}>
                    Yes, Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
