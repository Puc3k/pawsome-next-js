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
  const [floatingItems] = useState<string[]>(['🎾', '🦴', '🐶', '🐕'])
  const [totalCompletions, setTotalCompletions] = useState<number | null>(null)

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

  useEffect(() => {
    async function fetchTotalQuizzes () {
      try {
        const res = await fetch('/api/winner')
        if (!res.ok) throw new Error('Failed to fetch winners')
        const { totalQuizzes } = await res.json()
        setTotalCompletions(totalQuizzes)
      } catch (error) {
        console.error('Error fetching total quizzes:', error)
      }
    }

    fetchTotalQuizzes()
  }, [])

  return (
    <section
      className="relative bg-gradient-to-b from-white to-amber-100 py-16 pb-32 overflow-hidden">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 font-[Poppins]">
          Welcome to Pawsome!
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto font-[Poppins]">
          Discover the cutest dogs chosen by our community. Vote for your
          favorite
          and help us find the ultimate Top Dog!
        </p>
      </div>
      {totalCompletions !== null && (
        <div className="mt-8 text-center">
          <div className="text-5xl font-extrabold text-amber-600 tracking-tight font-mono">
            {totalCompletions}
          </div>
          <p className="mt-2 text-md text-gray-500 font-semibold font-mono">
            Quizzes <span className="text-amber-500">Completed</span>
          </p>
        </div>
      )}
      <div className="flex items-end justify-center gap-8 mt-10">
        <div className="glass-pane flex flex-col items-center">
          <Image
            src={ topImages[1] ? topImages[1]['_id'] : logoImg}
            width="600"
            height="600"
            alt="Top 2 Dog"
            className="w-60 h-60 object-cover rounded-3xl shadow-lg border-4 border-slate-400/50"
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
            className="w-80 h-80 object-cover rounded-3xl shadow-xl border-4 border-yellow-500/50"
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
            className="w-60 h-60 object-cover rounded-3xl shadow-lg border-4 border-amber-600/50"
            priority
          />
          <p className="mt-4 text-lg font-semibold font-mono">#3 Fan
            Favorite</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          className="rounded-md bg-amber-400 py-3 px-8 border border-transparent text-center text-sm text-white font-mono transition-all shadow-sm hover:shadow-lg focus:bg-amber-500 focus:shadow-none active:bg-amber-500 hover:bg-amber-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer font-bold">
          Start the Quiz →
        </button>
      </div>

      {hasMounted && floatingItems.map((item, index) => {
        const positions = [
          { top: '20%', left: '15%' },
          { top: '30%', right: '15%' },
          { top: '55%', left: '5%' },
          { bottom: '25%', right: '10%' },
        ];
        const position = positions[index % positions.length];
        return (
          <div
            key={ index }
            className="absolute text-4xl animate-float"
            style={ {
              top: position.top,
              left: position.left || 'auto', // Użyj left, jeśli zdefiniowane
              right: position.right || 'auto', // Użyj right, jeśli zdefiniowane
              bottom: position.bottom || 'auto', // Użyj bottom, jeśli zdefiniowane
              animationDuration: `${ Math.random() * 5 + 3 }s`,
            } }
          >
            { item }
          </div>
        );
      })}

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
