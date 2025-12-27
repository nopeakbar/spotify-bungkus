import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getTopTracks, getTopArtists } from "../lib/spotify";
import { WrappedStory } from "../components/WrappedStory";
// Import LandingPage yang baru dibuat
import LandingPage from "../components/LandingPage";

export const dynamic = 'force-dynamic';

const calculateTopGenre = (artists: any[]) => {
  const genreCounts: { [key: string]: number } = {};
  artists.forEach((artist) => {
    artist.genres.forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });
  let topGenre = "Pop";
  let maxCount = 0;
  Object.entries(genreCounts).forEach(([genre, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topGenre = genre;
    }
  });
  return topGenre.replace(/\b\w/g, l => l.toUpperCase());
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home(props: PageProps) {
  const session = await getServerSession(authOptions);

  // === JIKA BELUM LOGIN: TAMPILKAN LANDING PAGE ===
  if (!session) {
    return <LandingPage />;
  }

  // === JIKA SUDAH LOGIN: PROSES DATA ===
  const searchParams = await props.searchParams;
  const range = typeof searchParams.range === 'string' ? searchParams.range : null;

  // Jika BELUM pilih range, tampilkan MENU PILIHAN
  if (!range) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#121212] text-white p-6 font-sans">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Welcome, {session.user?.name}</h2>
            <p className="text-gray-400">Choose your time capsule:</p>
        </div>

        <div className="grid gap-4 w-full max-w-sm">
          <Link href="/?range=short_term" className="group relative overflow-hidden rounded-xl bg-purple-900 p-6 transition hover:scale-105 border border-white/10">
             <div className="relative z-10">
               <h3 className="text-2xl font-black">Last Month</h3>
               <p className="text-purple-300 text-sm">Recent obsessions (~4 Weeks)</p>
             </div>
             <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition group-hover:opacity-20"></div>
          </Link>

          <Link href="/?range=medium_term" className="group relative overflow-hidden rounded-xl bg-green-900 p-6 transition hover:scale-105 border border-white/10">
             <div className="relative z-10">
               <h3 className="text-2xl font-black">Last 6 Months</h3>
               <p className="text-green-300 text-sm">Your current era</p>
             </div>
             <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 transition group-hover:opacity-20"></div>
          </Link>

          <Link href="/?range=long_term" className="group relative overflow-hidden rounded-xl bg-pink-900 p-6 transition hover:scale-105 border border-white/10">
             <div className="relative z-10">
               <h3 className="text-2xl font-black">All Time</h3>
               <p className="text-pink-300 text-sm">Lifetime favorites (~1 Year+)</p>
             </div>
             <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 transition group-hover:opacity-20"></div>
          </Link>
        </div>

        <Link href="/api/auth/signout" className="mt-12 text-gray-500 text-xs hover:text-white uppercase tracking-widest">
          [ Log Out ]
        </Link>
      </main>
    );
  }

  // Jika SUDAH ada range, Fetch Data & Tampilkan Story
  let tracks = [];
  let artists = [];
  let topGenre = "";

  try {
    const [tracksData, artistsData] = await Promise.all([
      getTopTracks(session.accessToken as string, range),
      getTopArtists(session.accessToken as string, range)
    ]);
    tracks = tracksData.items;
    artists = artistsData.items;
    if (artists.length > 0) {
      topGenre = calculateTopGenre(artists);
    }
  } catch (e) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#121212] text-white p-4">
         <p className="text-red-400 mb-4">Session Expired.</p>
         <Link href="/api/auth/signin" className="bg-white text-black px-6 py-3 rounded-full font-bold">Login Again</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#121212] py-10 flex flex-col items-center justify-center gap-6 font-sans overflow-hidden">
      <div className="absolute top-6 left-6 z-50">
         <Link href="/" className="bg-black/50 text-white px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md hover:bg-white hover:text-black transition">← CHANGE DATE</Link>
      </div>
      <WrappedStory tracks={tracks} artists={artists} topGenre={topGenre} userName={session.user?.name || "User"} />
    </main>
  );
}