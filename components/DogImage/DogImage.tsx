import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { DogImageProps } from '@/types/dog'

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 0.6 },
  exit: { opacity: 0 },
}

const DogImage = ({
  imageUrl,
  alt,
  isSelected,
  onClick,
  onAnimationComplete,
}: DogImageProps)  => {
  return <div onClick={ onClick }
              className="bg-white relative w-full h-72 md:h-96 md:w-96 rounded-lg
     shadow-lg cursor-pointer hover:scale-105 overflow-hidden transition-transform border-2 border-transparent hover:border-yellow-400">
    <Image src={ imageUrl }
           alt={ alt }
           fill
           sizes="(max-width: 768px) 100vw, 50vw"
           className="w-full h-full object-cover md:object-fill rounded-lg"
           priority
    />
    <AnimatePresence>
      { isSelected && (
        <motion.div
          variants={ variants }
          initial="initial"
          animate="animate"
          exit="exit"
          transition={ { duration: 0.2 } }
          onAnimationComplete={ (definition) => {
            if (definition === 'animate') {
              onAnimationComplete?.()
            }
          } }
          className="absolute inset-0 bg-yellow-400 flex items-center justify-center rounded-lg"
        >
          <span className="text-white text-5xl font-bold">✔</span>
        </motion.div>
      ) }
    </AnimatePresence>
  </div>
}

export default DogImage