// app/layout.tsx
import type { Metadata } from "next";
// Kita ganti Orbitron dengan Inter (Font yang bersih & modern)
import { Inter } from "next/font/google"; 
import "./globals.css";

// Konfigurasi font Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Wrapped",
  description: "My top tracks of the year.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* className={inter.className}: Menerapkan font ke seluruh web
        bg-[#121212]: Memberikan warna background dasar gelap (Spotify dark grey)
        text-white: Agar teks default berwarna putih
      */}
      <body className={`${inter.className} bg-[#121212] text-white`}>
        {children}
      </body>
    </html>
  );
}