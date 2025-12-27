"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginBtn from "./LoginBtn";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdbrgkb"; 

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email: email, message: "Request Access My Wrapped" }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white p-4 font-sans overflow-hidden selection:bg-green-500 selection:text-black">
        
        {/* BACKGROUND ANIMATION */}
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

        {/* KONTEN UTAMA */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-yellow-400 flex items-center gap-2"
          >
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
             </span>
             Development Mode
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-2 leading-[0.9]">
            <motion.span 
              initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="block text-white"
            >
              ASEK
            </motion.span>
            <motion.span 
              initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="block text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-green-200 to-white"
            >
              MUSICmu
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

          {/* === FORM REQUEST ACCESS (AUTO SUBMIT) === */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            className="mt-12 w-full max-w-md p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
          >
             {status === "success" ? (
                // Tampilan kalau SUKSES kirim
                <div className="text-center py-4">
                   <div className="text-green-400 text-4xl mb-2">✅</div>
                   <h3 className="text-white font-bold text-lg">Request Sent!</h3>
                   <p className="text-gray-400 text-sm">Wait for my email confirmation.</p>
                </div>
             ) : (
                // Tampilan FORMULIR
                <>
                  <h3 className="text-white font-bold text-lg mb-2">Can't Login?</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Access is limited to 25 users. 
                    <br/>Enter your email to join yh.
                  </p>

                  <form onSubmit={handleRequest} className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="email" 
                        name="email"
                        placeholder="your-spotify-email@example.com"
                        required
                        disabled={status === "submitting"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-black/50 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 text-sm placeholder:text-gray-600 transition-colors disabled:opacity-50"
                      />
                      <button 
                        type="submit"
                        disabled={status === "submitting"}
                        className="bg-white text-black font-bold px-6 py-3 rounded-lg text-sm hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                      >
                        {status === "submitting" ? (
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        ) : "JOIN LIST"}
                      </button>
                  </form>
                  {status === "error" && <p className="text-red-400 text-xs mt-2">Failed to send. Try again.</p>}
                </>
             )}
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