import React from 'react';
import './StatsCard.css';

export function StatsCard({ stats }) {
  const fillPercentage = stats.total > 0 ? (stats.occupied / stats.total) * 100 : 0;

  return (
    <div className="stats-container animate-fade-in">
      <div className="stat-card glass">
        <div className="stat-header">
          <h3 className="stat-title">Total Rooms</h3>
        </div>
        <div className="stat-value">{stats.total}</div>
      </div>

      <div className="stat-card glass occupied-card">
        <div className="stat-header">
          <h3 className="stat-title">Occupied</h3>
          <span className="stat-badge occupied">Filled</span>
        </div>
        <div className="stat-value text-red">{stats.occupied}</div>
      </div>

      <div className="stat-card glass vacant-card">
        <div className="stat-header">
          <h3 className="stat-title">Remaining</h3>
          <span className="stat-badge vacant">Available</span>
        </div>
        <div className="stat-value text-green">{stats.remaining}</div>
      </div>

      <div className="stat-card glass progress-card">
        <div className="stat-header">
          <h3 className="stat-title">Occupancy Rate</h3>
        </div>
        <div className="stat-value">{Math.round(fillPercentage)}%</div>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
