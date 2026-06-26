# Setting Up Google OAuth for MAIDEN

NextAuth.js is already wired up in the codebase. Follow these steps to activate Google sign-in.

## Step 1: Install next-auth

```bash
npm install next-auth
```

## Step 2: Create a Google OAuth app

1. Go to https://console.cloud.google.com
2. Create a new project (or select an existing one)
3. In the left sidebar, go to **APIs and Services > OAuth consent screen**
   - Choose **External**, fill in app name (MAIDEN), support email, developer email
4. Go to **APIs and Services > Credentials**
5. Click **Create Credentials > OAuth 2.0 Client ID**
6. Application type: **Web application**
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for local dev)
   - `https://your-vercel-domain.vercel.app/api/auth/callback/google` (for production)
8. Click **Create** and copy the Client ID and Client Secret

## Step 3: Create .env.local

Create a file called `.env.local` in the root of `web3learn-web`:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

Generate a secure NEXTAUTH_SECRET with:
```bash
openssl rand -base64 32
```

## Step 4: Run the app

```bash
npm run dev
```

The "Continue with Google" button on the auth page will now work.

## Notes

- The `.env.local` file is gitignored by default. Never commit it.
- For Vercel deployment, add these four environment variables in your Vercel project settings under Settings > Environment Variables.
- Update `NEXTAUTH_URL` to your production URL on Vercel.
- The NextAuth route is at `app/api/auth/[...nextauth]/route.ts`.
