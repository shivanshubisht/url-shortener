'use client';
import { useState } from 'react';
import AddLinkForm from '../components/AddLinkForm';
import Link from 'next/link';

export default function Home() {
  const [linkId, setLinkId] = useState<string | null>(null);
  const [customLink, setCustomLink] = useState<string | null>(null);
  return (
    <main>
      <h1>Shortened Url</h1>
      <AddLinkForm setLinkId={setLinkId} setCustomLink={setCustomLink} />
      {linkId ? (
        <div>
          <Link href={`/${linkId}`}>{`/${linkId}`}</Link>
        </div>
      ) : null}
      {customLink ? (
        <div>
          <Link href={`/${customLink}`}>{`/${customLink}`}</Link>
        </div>
      ) : null}
    </main>
  );
}
