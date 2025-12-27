"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DownloadBtn from './DownloadBtn';

// --- Interfaces ---
interface Track {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  popularity: number;
}

interface Artist {
  name: string;
  images: { url: string }[];
  genres: string[];
}

interface WrappedStoryProps {
  tracks: Track[];
  artists: Artist[];
  topGenre: string;
  userName: string;
}

// --- Background Colors ---
const bgColors = [
  "bg-purple-800", // 0. Intro
  "bg-yellow-600", // 1. Top Genre
  "bg-red-700",    // 2. Headliners
  "bg-green-600",  // 3. Top Song
  "bg-indigo-900", // 4. Deep Cut
  "bg-orange-600", // 5. Wall of Fame
  "bg-pink-600",   // 6. Summary
];

export const WrappedStory = ({ tracks, artists, topGenre, userName }: WrappedStoryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = bgColors.length;

  const nextSlide = () => setCurrentSlide((curr) => (curr + 1) % totalSlides);

  // Logic: Cari lagu paling "hipster" (Popularity terendah)
  const deepCutTrack = useMemo(() => {
    if (!tracks.length) return null;
    const sortedByPop = [...tracks].sort((a, b) => a.popularity - b.popularity);
    return sortedByPop[0];
  }, [tracks]);

  const topTrack = tracks[0];

  // Logic Render Konten Slide
  const renderContent = () => {
    switch (currentSlide) {
      // 0. INTRO
      case 0: 
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-white tracking-tighter leading-tight"
            >
              YOUR <br/> WRAPPED
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white text-lg font-medium">
              Weve collected your stats. <br/> Lets dive in.
            </motion.p>
            <p className="text-white/60 text-xs mt-10 animate-pulse uppercase tracking-widest">(Tap card to start)</p>
          </div>
        );

      // 1. TOP GENRE
      case 1: 
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 select-none pointer-events-none">
                 {[...Array(6)].map((_,i) => <span key={i} className="text-8xl font-black uppercase text-black leading-none">{topGenre}</span>)}
            </div>
            <p className="text-white font-bold mb-4 text-xl uppercase tracking-widest relative z-10">The Vibe</p>
            <motion.div 
               initial={{ scale: 3, rotate: 10, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: "spring" }}
               className="bg-black text-white px-6 py-4 text-4xl font-black uppercase tracking-tighter relative z-10 shadow-xl transform -rotate-2 border-4 border-white"
            >
              {topGenre}
            </motion.div>
          </div>
        );

      // 2. HEADLINERS (Top 3 Artists)
      case 2: 
        return (
          <div className="flex flex-col h-full p-8 justify-center">
            <h2 className="text-4xl font-black text-white mb-8 tracking-tighter text-center uppercase">Headliners</h2>
            <div className="space-y-6">
              {artists.slice(0, 3).map((artist, i) => (
                <motion.div 
                  key={artist.name}
                  initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-4 bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/10"
                >
                  <span className="text-4xl font-black text-white/50 w-8">#{i + 1}</span>
                  <img src={artist.images[1]?.url || artist.images[0]?.url} className="w-16 h-16 rounded-full object-cover border-2 border-white" alt="" />
                  <span className="text-xl font-bold text-white truncate">{artist.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      // 3. TOP SONG
      case 3: 
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <p className="text-white font-bold mb-6 text-xl uppercase tracking-widest">On Repeat</p>
            <motion.img 
               src={topTrack?.album.images[0]?.url} 
               initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
               className="w-64 h-64 shadow-2xl mb-8 object-cover rounded-md"
            />
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <h2 className="text-3xl font-black text-white leading-tight mb-2 tracking-tight">{topTrack?.name}</h2>
              <p className="text-lg text-white/90 font-medium bg-black/30 inline-block px-3 py-1 rounded-full">{topTrack?.artists[0].name}</p>
            </motion.div>
          </div>
        );

      // 4. DEEP CUT
      case 4: 
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-indigo-900 relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
             <p className="text-indigo-200 font-bold mb-4 text-sm uppercase tracking-widest relative z-10">The Deep Cut</p>
             <h3 className="text-white text-2xl font-bold mb-8 leading-tight relative z-10">
               Not popular,<br/>but you loved it.
             </h3>
             
             <motion.div 
               initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.8 }}
               className="bg-white p-4 pb-6 rounded-sm shadow-2xl w-60 transform rotate-3 text-black relative z-10"
             >
                <img src={deepCutTrack?.album.images[0]?.url} className="w-full h-auto mb-4 grayscale contrast-125" />
                <p className="font-bold text-lg leading-none line-clamp-2">{deepCutTrack?.name}</p>
                <p className="text-sm text-gray-600 mt-1 truncate">{deepCutTrack?.artists[0].name}</p>
             </motion.div>
             
             <div className="mt-8 flex gap-2 text-indigo-300 text-xs relative z-10 bg-black/40 px-3 py-1 rounded-full">
                <span>Popularity Score:</span>
                <span className="font-bold text-white">{deepCutTrack?.popularity}/100</span>
             </div>
          </div>
        );

      // 5. WALL OF FAME
      case 5:
        return (
           <div className="h-full flex flex-col justify-center p-6">
              <h2 className="text-4xl font-black text-white mb-6 text-center uppercase tracking-tighter">Wall of Fame</h2>
              <div className="grid grid-cols-3 gap-3">
                 {tracks.slice(0, 9).map((track, i) => (
                    <motion.img 
                      key={i}
                      src={track.album.images[1]?.url || track.album.images[0]?.url}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}
                      className="w-full aspect-square object-cover rounded-md shadow-lg"
                    />
                 ))}
              </div>
           </div>
        );

      // 6. SUMMARY
      case 6: 
        return (
          <div id="receipt-container" className="h-full flex flex-col p-8 bg-pink-600">
             <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">TOP 10</h2>
                <div className="space-y-3">
                  {tracks.slice(0, 10).map((track, i) => (
                    <div key={i} className="flex items-center gap-3 border-b border-white/10 pb-1 last:border-0">
                      <span className="text-xl font-black text-black/30 w-6 text-right">{i + 1}</span>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-md font-bold text-white truncate">{track.name}</span>
                        <span className="text-xs font-medium text-pink-200 truncate">{track.artists[0].name}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
             <div className="mt-4 text-center">
                <p className="text-white/50 text-[10px] uppercase tracking-widest">generated by {userName} • 2025</p>
             </div>
          </div>
        );
      default: return null;
    }
  };

  if (!tracks.length || !artists.length) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      <div 
        onClick={nextSlide}
        className={`relative w-[350px] h-[650px] ${bgColors[currentSlide]} transition-colors duration-700 ease-in-out rounded-[30px] shadow-2xl overflow-hidden cursor-pointer select-none font-sans ring-4 ring-white/10`}
      >
        {/* Progress Bar */}
        <div className="absolute top-4 left-0 w-full flex gap-1 px-3 z-30">
          {bgColors.map((_, i) => (
             <div key={i} className="h-1 flex-1 bg-black/20 rounded-full overflow-hidden">
               <motion.div 
                 initial={false}
                 animate={{ width: i <= currentSlide ? '100%' : '0%' }}
                 className="h-full bg-white"
               />
             </div>
          ))}
        </div>

        {/* Content Animation */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Download Button (Only on Last Slide) */}
      {currentSlide === totalSlides - 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
           <DownloadBtn />
           <p className="text-gray-500 text-xs mt-2 text-center">Click card to restart</p>
        </motion.div>
      )}
    </div>
  );
};