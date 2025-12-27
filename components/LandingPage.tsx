"use client";

import React from "react";
import { motion } from "framer-motion";
import LoginBtn from "./LoginBtn";

export default function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white p-4 font-sans overflow-hidden selection:bg-green-500 selection:text-black">
        
        {/* 1. BACKGROUND ANIMATION */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div 
               animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-600 rounded-full blur-[120px] opacity-30" 
            />
            <motion.div 
               animate={{ scale: [1, 1.5, 1], x: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-800 rounded-full blur-[150px] opacity-20" 
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>

        {/* 2. KONTEN UTAMA */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-widest uppercase text-green-400"
          >
             Spotify Analytics 2025
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-2 leading-[0.9]">
            <motion.span 
              initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="block text-white"
            >
              MY
            </motion.span>
            <motion.span 
              initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="block text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-200 to-white"
            >
              WRAPPED
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="mt-6 text-lg text-gray-400 max-w-md leading-relaxed"
          >
            Unwrap your music DNA. Discover your <span className="text-white font-bold">Top Songs</span>, <span className="text-white font-bold">Secret Gems</span>, and define your <span className="text-white font-bold">Era</span>.
          </motion.p>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, type: "spring" }}
            className="mt-10"
          >
             <LoginBtn />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="mt-16 text-xs text-white/20 uppercase tracking-[0.2em]"
          >
             Secure • Private • Open Source
          </motion.div>
        </div>
      </main>
  );
}