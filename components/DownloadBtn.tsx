"use client";

import React, { useState } from 'react';
import html2canvas from 'html2canvas';

export default function DownloadBtn() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const element = document.getElementById('receipt-container'); // Pastikan ID ini sama dengan di Receipt.tsx

    if (element) {
      try {
        // Opsi scale: 2 bikin gambar lebih tajam (HD)
        const canvas = await html2canvas(element, { 
          scale: 2,
          backgroundColor: null // Transparan background
        });
        
        const data = canvas.toDataURL('image/png');
        const link = document.createElement('a');

        // Format nama file: receipt-tanggal-jam.png
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.href = data;
        link.download = `receiptify-${timestamp}.png`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Gagal generate gambar:", error);
        alert("Gagal mendownload gambar. Coba lagi!");
      }
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={loading}
      className={`px-6 py-3 rounded-full font-bold transition-all shadow-lg 
        ${loading 
          ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
          : 'bg-white text-black hover:bg-gray-200 hover:scale-105'
        }`}
    >
      {loading ? 'Generating...' : 'Download Image 📸'}
    </button>
  );
}