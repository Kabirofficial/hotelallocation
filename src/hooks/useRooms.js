import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { HOTELS, MOCK_ROOMS } from '../data/constants';

export function useRooms() {
  const [bookings, setBookings] = useState([]);
  const [activeHotelId, setActiveHotelId] = useState(HOTELS[0].id);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch bookings on mount
  useEffect(() => {
    async function fetchBookings() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*');
      
      if (error) {
        console.error("Error fetching bookings:", error);
      } else {
        // Map snake_case from DB to camelCase for our frontend
        const formattedData = data.map(b => ({
          id: b.id,
          roomId: b.room_id,
          hotelId: b.hotel_id,
          guestName: b.guest_name,
          checkIn: b.check_in,
          checkOut: b.check_out,
          createdAt: b.created_at
        }));
        setBookings(formattedData);
      }
      setIsLoading(false);
    }
    fetchBookings();
  }, []);

  const activeHotel = useMemo(() => HOTELS.find(h => h.id === activeHotelId), [activeHotelId]);

  const rooms = useMemo(() => MOCK_ROOMS[activeHotelId] || [], [activeHotelId]);

  const activeBookingsForHotel = useMemo(() => {
    return bookings.filter(b => b.hotelId === activeHotelId);
  }, [bookings, activeHotelId]);

  const roomStatuses = useMemo(() => {
    return rooms.map(room => {
      const booking = activeBookingsForHotel.find(b => b.roomId === room.id);
      return {
        ...room,
        isOccupied: !!booking,
        booking: booking || null,
      };
    });
  }, [rooms, activeBookingsForHotel]);

  const stats = useMemo(() => {
    const total = activeHotel?.totalRooms || 0;
    const occupied = activeBookingsForHotel.length;
    const remaining = total - occupied;
    return { total, occupied, remaining };
  }, [activeHotel, activeBookingsForHotel]);

  const addBooking = async (bookingData) => {
    const newBookingDb = {
      hotel_id: activeHotelId,
      room_id: bookingData.roomId,
      guest_name: bookingData.guestName,
      check_in: bookingData.checkIn,
      check_out: bookingData.checkOut
    };

    // Optimistically update local UI immediately
    const tempId = Date.now().toString();
    const optimisticBooking = {
      id: tempId,
      roomId: bookingData.roomId,
      hotelId: activeHotelId,
      guestName: bookingData.guestName,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      createdAt: new Date().toISOString()
    };
    
    setBookings(prev => [...prev, optimisticBooking]);

    // Send to Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([newBookingDb])
      .select();

    if (error) {
      console.error("Error adding booking:", error);
      // Revert optimistic update on failure
      setBookings(prev => prev.filter(b => b.id !== tempId));
      alert("Failed to save booking. Please try again.");
    } else if (data && data[0]) {
      // Replace optimistic temp ID with real DB ID
      setBookings(prev => prev.map(b => 
        b.id === tempId ? { ...b, id: data[0].id } : b
      ));
    }
  };

  const removeBooking = async (bookingId) => {
    // Optimistic update
    const previousBookings = [...bookings];
    setBookings(prev => prev.filter(b => b.id !== bookingId));

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);
      
    if (error) {
      console.error("Error removing booking:", error);
      setBookings(previousBookings); // Revert
    }
  };

  return {
    hotels: HOTELS,
    activeHotel,
    activeHotelId,
    setActiveHotelId,
    roomStatuses,
    stats,
    addBooking,
    removeBooking,
    allBookings: bookings,
    isLoading
  };
}
