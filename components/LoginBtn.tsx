"use client";

import { signIn } from "next-auth/react";
import React from "react";
// GANTI IMPORT INI:
import { motion } from "framer-motion";

export default function LoginBtn() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => signIn("spotify", { callbackUrl: "/" })}
      className="relative flex items-center gap-3 bg-[#1DB954] text-black px-12 py-5 rounded-full font-black text-xl hover:bg-[#1ed760] transition-all duration-300 shadow-[0_0_40px_-10px_rgba(29,185,84,0.5)] group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>
      
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
        <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM17.5 17.3C17.2 17.7 16.6 17.9 16.2 17.6C13.5 16 10 15.6 5.8 16.6C5.4 16.7 5 16.4 4.9 16C4.8 15.6 5.1 15.2 5.5 15.1C10.2 14 14.1 14.5 17.3 16.4C17.6 16.6 17.7 17.1 17.5 17.3ZM18.9 14C18.6 14.6 17.9 14.8 17.4 14.4C14.2 12.5 9.4 12 5.6 13.1C5 13.3 4.5 13 4.3 12.4C4.1 11.9 4.4 11.4 5 11.2C9.4 9.9 14.8 10.5 18.5 12.8C19 13.1 19.2 13.7 18.9 14ZM19 10.5C15.2 8.3 8.8 8.1 5.1 9.2C4.5 9.4 3.9 9 3.7 8.4C3.5 7.8 3.9 7.2 4.5 7C8.8 5.7 15.9 6 20.2 8.5C20.8 8.8 21 9.5 20.7 10.1C20.4 10.7 19.6 10.9 19 10.5Z" />
      </svg>
      
      <span className="relative z-10">CONNECT SPOTIFY</span>
    </motion.button>
  );
}