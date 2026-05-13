import React from 'react';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

export function ExportButton({ data, hotelName }) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    // Format data for Excel
    const formattedData = data.map(booking => ({
      'Room Number': booking.roomId,
      'Guest Name': booking.guestName,
      'Total Guests': booking.memberCount || 1,
      'Additional Names': booking.memberNames || '',
      'Check-In': booking.checkIn,
      'Check-Out': booking.checkOut,
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);

    // Auto-size columns
    const wscols = [
      { wch: 12 }, // Room Number
      { wch: 25 }, // Guest Name
      { wch: 15 }, // Total Guests
      { wch: 40 }, // Additional Names
      { wch: 15 }, // Check-In
      { wch: 15 }  // Check-Out
    ];
    ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Guests");

    // Generate filename
    const date = new Date().toISOString().split('T')[0];
    const fileName = `${hotelName.replace(/\s+/g, '_')}_Guests_${date}.xlsx`;

    // Trigger download
    XLSX.writeFile(wb, fileName);
  };

  return (
    <button className="btn btn-primary" onClick={handleExport} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Download size={18} />
      Export to Excel
    </button>
  );
}
