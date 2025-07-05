import Image, { StaticImageData } from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

interface DogImageProps {
  imageUrl: string | StaticImageData,
  alt: string,
  isSelected: boolean,
  onClick: () => void,
  onAnimationComplete?: () => void,
}

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 0.6 },
  exit: { opacity: 0 },
}

const DogImage: React.FC<DogImageProps> = ({
  imageUrl,
  alt,
  isSelected,
  onClick,
  onAnimationComplete,
}) => {
  return <div onClick={ onClick }
              className="bg-white relative w-full h-70 md:h-95 md:w-95 rounded-lg
     shadow-lg cursor-pointer hover:scale-105 overflow-hidden transition-transform border-2 border-transparent hover:border-yellow-400">
    <Image src={ imageUrl }
           alt={ alt }
           width="300"
           height="300"
           className="w-full h-full object-fill md:object-cover rounded-lg"
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
              onAnimationComplete && onAnimationComplete()
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