'use client'

import { useEffect, useState } from 'react'
import { fetchWinners } from '@/lib/quiz'
import TopDogItem from '@/components/TopDog/TopDogItem'
import FloatingItems from '@/components/Utils/FloatingItems'
import TopDogImageSkeleton from '@/components/TopDog/TopDogImageSkeleton'

async function getTopWinners() {
  return await fetchWinners()
}

const TopDogs: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const [topImages, setTopImages] = useState([])
  const [floatingItems] = useState<string[]>([ '🎾', '🦴', '🐶', '🐕' ])
  const [totalCompletions, setTotalCompletions] = useState<number | null>(null)
  const [isTopImagesLoaded, setIsTopImagesLoaded] = useState(true)
  const [isCompletionsLoading, setIsCompletionsLoading] = useState(true)

  useEffect(() => {
    async function fetchData () {
      const winners = await getTopWinners()
      setTopImages(winners.topWinners)
      setIsTopImagesLoaded(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    async function fetchTotalQuizzes () {
      setIsCompletionsLoading(true)
      try {
        const res = await fetch('/api/winner')
        if (!res.ok) throw new Error('Failed to fetch winners')
        const { totalQuizzes } = await res.json()
        setTotalCompletions(totalQuizzes)
      } catch (error) {
        console.error('Error fetching total quizzes:', error)
      } finally {
        setIsCompletionsLoading(false)
      }
    }

    fetchTotalQuizzes()
  }, [])
console.log(isTopImagesLoaded)
  return (
    <section className="relative bg-gradient-to-b from-white to-amber-100 py-16 pb-32 overflow-hidden">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 font-[Poppins]">
          Welcome to Pawsome!
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto font-[Poppins]">
          Discover the cutest dogs chosen by our community. Vote for your
          favorite and help us find the ultimate Top Dog!
        </p>
      </div>
      { isCompletionsLoading ? (
        <div className="mt-8 text-center">
          <div className="text-5xl font-extrabold text-amber-500 tracking-tight font-mono animate-pulse rounded-lg w-24 mx-auto">0</div>
          <p className="mt-2 text-md text-gray-500 font-semibold font-mono">
            Quizzes <span className="text-amber-500">Completed</span>
          </p>
        </div>
      ) : (
        totalCompletions !== null && (
          <div className="mt-8 text-center">
            <div className="text-5xl font-extrabold text-amber-600 tracking-tight font-mono">
              { totalCompletions }
            </div>
            <p className="mt-2 text-md text-gray-500 font-semibold font-mono">
              Quizzes <span className="text-amber-500">Completed</span>
            </p>
          </div>
        )
      )}
      <div className="flex items-end justify-center gap-8 mt-10">
        {isTopImagesLoaded ? (
          <>
            <div className="flex flex-col items-center w-60 h-70 "><TopDogImageSkeleton /></div>
            <div className="flex flex-col items-center w-80 h-90"><TopDogImageSkeleton /></div>
            <div className="flex flex-col items-center w-60 h-70"><TopDogImageSkeleton /></div>
          </>
        ) : (
          topImages.length > 0 && (
            <>
              <TopDogItem image={topImages[1]} index={1} />
              <TopDogItem image={topImages[0]} index={0} />
              <TopDogItem image={topImages[2]} index={2} />
            </>
          )
        )}
      </div>
      <div className="mt-12 text-center">
        <button className="rounded-md bg-amber-400 py-3 px-8 border border-transparent text-center text-sm text-white font-mono transition-all shadow-sm hover:shadow-lg focus:bg-amber-500 focus:shadow-none active:bg-amber-500 hover:bg-amber-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer font-bold">
          Start the Quiz →
        </button>
      </div>
      { hasMounted && <FloatingItems items={ floatingItems } /> }
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.3px)] h-16 text-white" fill="white" preserveAspectRatio="none" viewBox="0 0 360 28">
          <path d="M0,14 C30,23 60,28 90,28 C120,28 150,23 180,14 C210,5 240,0 270,0 C300,0 330,5 360,14 L360,30 L0,30 Z" />
        </svg>
      </div>
    </section>
  )
}

export default TopDogs