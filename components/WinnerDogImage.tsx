import Image from 'next/image'

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
        className="text-4xl font-bold mb-4 flex items-center gap-2 text-gray-800">
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
        className="mt-6 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-white text-lg font-semibold rounded-full shadow-md transition"
      >
        Reset
      </button>
    </div>
  )
}