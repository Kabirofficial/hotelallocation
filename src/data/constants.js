export const HOTELS = [
  { id: 'lion-valley', name: 'Lion Valley Resort', totalRooms: 33 },
  { id: 'opera', name: 'Hotel Opera', totalRooms: 24 },
  { id: 'green-hill', name: 'Green Hill Magic Resort', totalRooms: 6 },
  { id: 'rudra', name: 'Rudra', totalRooms: 12 },
];

// Mock data to start with before hooking up Supabase
export const initialBookings = [
  { id: '1', roomId: '1', hotelId: 'lion-valley', guestName: 'Alice Smith', checkIn: '2026-05-15', checkOut: '2026-05-18' },
  { id: '2', roomId: '3', hotelId: 'lion-valley', guestName: 'Bob Johnson', checkIn: '2026-05-15', checkOut: '2026-05-17' },
];

export const MOCK_ROOMS = HOTELS.reduce((acc, hotel) => {
  acc[hotel.id] = Array.from({ length: hotel.totalRooms }, (_, i) => ({
    id: `${i + 1}`,
    number: `${i + 1}`,
    hotelId: hotel.id,
  }));
  return acc;
}, {});
