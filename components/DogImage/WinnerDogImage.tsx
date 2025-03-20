import Image from 'next/image'
import React from 'react'

interface WinnerDogImageProps {
  imageUrl: string,
  onReset: () => void
}

export default function WinnerDogImage ({
  imageUrl,
  onReset,
}: WinnerDogImageProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <h1
        className="text-5xl font-bold mb-8 flex items-center gap-2 text-gray-800 font-[Poppins] tracking-wide">
        <span>Winner!</span>
        <span className="text-yellow-500">🏆</span>
      </h1>
      <Image src={ imageUrl }
             alt="Winner dog image"
             width="300"
             height="300"
             className="w-95 h-95 object-cover rounded-lg"
             priority
      />
      <button
        onClick={ onReset }
        className="mt-6 mx-auto flex items-center rounded-md bg-amber-400 py-2 px-4 border border-transparent text-center text-sm text-white font-mono transition-all shadow-sm hover:shadow-lg focus:bg-amber-500 focus:shadow-none active:bg-amber-500 hover:bg-amber-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer font-bold"
      >
        Continue the Fun
      </button>
    </div>
  )
}