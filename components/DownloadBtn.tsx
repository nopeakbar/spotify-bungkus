"use client";

import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';

export default function DownloadBtn() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Biar gak ke-trigger ganti slide saat klik tombol
    setLoading(true);

    try {
      // 1. Cari elemen struk
      const element = document.getElementById('receipt-container');
      if (!element) throw new Error("Receipt element not found");

      // 2. Trik: Tunggu 100ms biar browser selesai render style/font
      await new Promise(resolve => setTimeout(resolve, 100));

      // 3. Generate gambar dengan settingan Production
      const canvas = await html2canvas(element, {
        backgroundColor: '#be185d', // Warna Pink-700 (sesuai slide summary) agar tidak transparan
        scale: 3, // Resolusi tinggi (3x lipat biar tajam di HP)
        useCORS: true, // WAJIB: Izinkan ambil aset external (font/image)
        allowTaint: true, // WAJIB: Izinkan canvas "kotor" oleh aset luar
        logging: false, // Matikan log biar bersih
      });

      // 4. Proses download
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement('a');
      link.download = `My-Wrapped-${new Date().getFullYear()}.png`;
      link.href = image;
      link.click();

    } catch (error) {
      console.error("Download failed:", error);
      alert("Gagal menyimpan gambar. Coba refresh atau gunakan browser lain.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleDownload}
      disabled={loading}
      className="bg-white text-pink-600 px-6 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          SAVING...
        </>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          SHARE / SAVE
        </>
      )}
    </motion.button>
  );
}