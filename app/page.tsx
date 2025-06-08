'use client';

import Image from 'next/image';
import LinkedinPostGenerator from './components/LinkedinPostGenerator';

export default function Home() {
  return (
    <main className="App">
      <div className='container'>
        <LinkedinPostGenerator />
      </div>
    </main>
  )
}