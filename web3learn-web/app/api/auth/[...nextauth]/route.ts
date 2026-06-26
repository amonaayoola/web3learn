// next-auth is added to package.json. Run `npm install` before using this route.
// See SETUP_GOOGLE_AUTH.md for full setup instructions.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - next-auth types available after npm install
import NextAuth from 'next-auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GoogleProvider from 'next-auth/providers/google';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (NextAuth as any)({
  providers: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (GoogleProvider as any)({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session }: { session: any }) {
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
});

export { handler as GET, handler as POST };
