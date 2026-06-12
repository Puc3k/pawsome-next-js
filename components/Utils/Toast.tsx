'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useToastStore } from '@/store/useToastStore'

const Toast = () => {
  const { message, type, hideToast } = useToastStore()

  useEffect(() => {
    if (message) {
      const timer = setTimeout(hideToast, 5000)
      return () => clearTimeout(timer)
    }
  }, [message, hideToast])

  return (
    <AnimatePresence>
      { message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border-l-4 text-gray-800 px-4 py-4 rounded-md shadow-2xl font-[Poppins] text-sm min-w-[300px] ${
            type === 'error' ? 'border-red-500' : 'border-green-500'
          }`}
          role="alert"
        >
          {type === 'error' ? (
            <ExclamationCircleIcon className="w-6 h-6 text-red-500 shrink-0" />
          ) : (
            <CheckCircleIcon className="w-6 h-6 text-green-500 shrink-0" />
          )}
          <span className="font-medium flex-1">{ message }</span>

          <button
            onClick={ hideToast }
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close notification"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </motion.div>
      ) }
    </AnimatePresence>
  )
}

export default Toast