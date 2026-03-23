"use client";

import Button from '@/components/Button';
import { getAccessToken, redirectToAuthCodeFlow } from '@/utils/spotify-auth';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {

    console.log('window tpye', typeof window);
    
    // separate the logic here
    if (typeof window !== "undefined") {
      // const accessToken = localStorage.getItem("spotify_access_token");
      // console.log('accessToken', accessToken);

      // if (!accessToken) {
      //   console.log('No access token found, redirecting to Spotify auth flow');
        
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          return;
        }

        const getToken = async () => {
          const token = await getAccessToken(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!, code);
          // localStorage.setItem("spotify_access_token", token);
          // window.history.replaceState({}, document.title, "/");
          

          console.log({token});

          const topTracks = await fetch ('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=15&offset=0', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(res => res.json());

          console.log('topTracks', topTracks);
          
        }

        getToken();

      // }
    }
  }, []);

  const handleLogin = () => {
    console.log(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID);
    
    redirectToAuthCodeFlow(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!);
  }

  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>

          <Button onClick={handleLogin} label="Login with Spotify" />
        </div>
      </main>
    </div>
  );
}
