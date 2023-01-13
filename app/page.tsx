'use client';
import { useState } from 'react';
import AddLinkForm from '../components/AddLinkForm';
import Link from 'next/link';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [linkId, setLinkId] = useState<string | null>(null);
  const [customLink, setCustomLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main
      className={`flex flex-col h-screen items-center justify-center gap-4 ${inter.className}`}
    >
      <h1 className='text-4xl font-semibold'>Shortened Url</h1>
      <AddLinkForm
        setLinkId={setLinkId}
        setCustomLink={setCustomLink}
        setLoading={setLoading}
        setError={setError}
      />
      {/* added height to prevent layout shift */}
      <div className='h-1'>
        {error && <div className='text-red-500'>{error}</div>}
        {!error && loading && <div className='text-green-500'>Loading...</div>}
        {!error && linkId && (
          <Link href={`/${linkId}`} className='text-blue-500'>
            {`https://url-shortener.shivanshu.in/${linkId}`}
          </Link>
        )}
        {!error && customLink && (
          <Link href={`/${customLink}`} className='text-blue-500'>
            {`https://url-shortener.shivanshu.in/${customLink}`}
          </Link>
        )}
      </div>
    </main>
  );
}
