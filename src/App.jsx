import React from 'react';
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
    allBookings
  } = useRooms();

  if (!activeHotel) return null;

  return (
    <>
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
      />
    </>
  );
}

export default App;
