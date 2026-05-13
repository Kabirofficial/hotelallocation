import React from 'react';
import { Settings, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import './Sidebar.css';

export function Sidebar({ hotels, activeHotelId, onSelectHotel }) {
  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <div className="logo-container">
          <Logo size={24} className="logo-icon" />
        </div>
        <h2 className="sidebar-title">Allocatr</h2>
      </div>

      <div className="sidebar-content">
        <p className="sidebar-label">PROPERTIES</p>
        <nav className="nav-menu">
          {hotels.map(hotel => (
            <button
              key={hotel.id}
              className={`nav-item ${activeHotelId === hotel.id ? 'active' : ''}`}
              onClick={() => onSelectHotel(hotel.id)}
            >
              <span className="hotel-name">{hotel.name}</span>
              {activeHotelId === hotel.id && <div className="active-indicator" />}
            </button>
          ))}
        </nav>
      </div>

      {/* <div className="sidebar-footer">
        <button className="footer-btn">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button className="footer-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div> */}
    </aside>
  );
}
