'use client'

import Link from 'next/link'
import Image from 'next/image'

import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import logoImg from '@/assets/logo.webp'
import { useState } from 'react'

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b-1 border-gray-200">
      <nav aria-label="Global"
           className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Pawsome</span>
            <Image
              alt=""
              src={ logoImg }
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={ () => setMobileMenuOpen(true) }
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-900"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6"/>
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            className="flex items-center rounded-md bg-amber-400 py-2 px-4 border border-transparent text-center text-sm text-white font-mono transition-all shadow-sm hover:shadow-lg focus:bg-amber-500 focus:shadow-none active:bg-amber-500 hover:bg-amber-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer font-bold"
            type="button">
            <Link href="/quiz">Start Quiz&nbsp;<span
              aria-hidden="true">&rarr;</span></Link>
          </button>
        </div>
      </nav>
      <Dialog open={ mobileMenuOpen } onClose={ setMobileMenuOpen }
              className="lg:hidden">
        <div className="fixed inset-0 z-10"/>
        <DialogPanel
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Pawsome</span>
              <Image
                alt=""
                src={ logoImg }
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={ () => setMobileMenuOpen(false) }
              className="-m-2.5 rounded-md p-2.5 text-slate-900"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6"/>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-gray-50"
                >
                  Homepage
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-gray-50"
                >
                  Start Quiz
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default Navbar