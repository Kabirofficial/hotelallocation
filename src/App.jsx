import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { useRooms } from './hooks/useRooms';
import './index.css';

function App() {
  const {
    hotels,
    activeHotel,
    activeHotelId,
    setActiveHotelId,
    roomStatuses,
    stats,
    addBooking,
    removeBooking,
    allBookings,
    isLoading
  } = useRooms();

  if (!activeHotel) return null;

  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-glass)',
          },
          success: {
            iconTheme: {
              primary: 'var(--status-vacant)',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--status-occupied)',
              secondary: 'white',
            },
          },
        }}
      />
      <Sidebar 
        hotels={hotels} 
        activeHotelId={activeHotelId} 
        onSelectHotel={setActiveHotelId} 
      />
      <Dashboard 
        activeHotel={activeHotel}
        stats={stats}
        roomStatuses={roomStatuses}
        onAddBooking={addBooking}
        onRemoveBooking={removeBooking}
        allBookings={allBookings}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
