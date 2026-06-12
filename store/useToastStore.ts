import { create } from 'zustand'

type ToastTypes = 'error' | 'success' | 'info' | 'warning';

interface ToastState {
  message: string | null
  type: ToastTypes
  showToast: (message: string, type?: ToastTypes) => void
  hideToast: () => void
}

export const useToastStore = create<ToastState>((set) => ( {
  message: null,
  type: 'info',
  showToast: (message, type = 'error') => set({ message, type }),
  hideToast: () => set({ message: null })
} ))