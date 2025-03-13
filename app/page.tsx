'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logoImg from '@/assets/logo.webp'
import { fetchWinners } from '@/lib/quiz'

async function getTopWinners() {
  return await fetchWinners()
}

const TopDogs: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [topImages, setTopImages] = useState([])
  const [floatingItems] = useState<string[]>(['🐶', '🦴', '🎾', '🐕'])

  useEffect(() => {
    async function fetchData() {
      const winners = await getTopWinners();

      setTopImages(winners.topWinners);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section
      className="relative bg-gradient-to-b from-white to-amber-100 py-16 pb-32 overflow-hidden">

      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-800 mb-4">
          🐾 Welcome to Pawsome!
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Discover the cutest dogs chosen by our community. Vote for your
          favorite
          and help us find the ultimate Top Dog!
        </p>
      </div>

      <div className="flex items-end justify-center gap-8">
        <div className="flex flex-col items-center">
          <Image
            src={ topImages[1] ? topImages[1]['_id'] : logoImg}
            width="600"
            height="600"
            alt="Top 2 Dog"
            className="w-60 h-60 object-cover rounded-3xl shadow-lg border-4 border-slate-400"
            priority
          />
          <p className="mt-4 text-lg font-semibold font-mono">#2 Runner Up</p>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src={ topImages[0] ? topImages[0]['_id'] : logoImg}
            width="600"
            height="600"
            alt="Top 1 Dog"
            className="w-80 h-80 object-cover rounded-3xl shadow-xl border-4 border-yellow-500"
            priority
          />
          <p className="mt-4 text-xl font-bold text-yellow-600 font-mono">🏆 #1
            Top Dog</p>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src={ topImages[2] ? topImages[2]['_id'] : logoImg}
            width="600"
            height="600"
            alt="Top 3 Dog"
            className="w-60 h-60 object-cover rounded-3xl shadow-lg border-4 border-amber-600"
            priority
          />
          <p className="mt-4 text-lg font-semibold font-mono">#3 Fan
            Favorite</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold rounded-full shadow-lg transition-all font-mono">
          Start the Quiz →
        </button>
      </div>

      {hasMounted && floatingItems.map((item, index) => (
        <div
          key={ index }
          className="absolute text-4xl animate-float"
          style={ {
            top: `${ Math.random() * 80 + 10 }%`,
            left: `${ Math.random() * 80 + 10 }%`,
            animationDuration: `${ Math.random() * 5 + 3 }s`,
          } }
        >
          { item }
        </div>
      )) }

      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-16 text-white"
          fill="white"
          preserveAspectRatio="none"
          viewBox="0 0 360 28"
        >
          <path
            d="M0,14 C30,23 60,28 90,28 C120,28 150,23 180,14 C210,5 240,0 270,0 C300,0 330,5 360,14 L360,30 L0,30 Z"/>
        </svg>
      </div>
    </section>
  )
}

export default TopDogs
