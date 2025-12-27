import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

// 1. Kita definisikan opsi-nya dulu dan tambahkan kata 'export'
export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: { scope: "user-top-read" }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken
      return session
    },
  },
}

// 2. Masukkan opsi tadi ke NextAuth
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }