import Link from 'next/link'
import Image from 'next/image'
import logoImg from '@/assets/logo.webp'

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800">
      <div className="w-full max-w-screen-xl mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between items-center">

          <Link href="/" className="flex items-center mb-6 md:mb-0 space-x-3">
            <Image
              alt="Pawsome logo"
              src={ logoImg }
              className="h-10 w-auto"
            />
            <span className="text-3xl font-extrabold font-mono">Pawsome</span>
          </Link>

          <ul className="flex flex-wrap justify-center gap-6 text-lg">
            <li>
              <Link href="#"
                    className="hover:text-yellow-500 transition">Stats</Link>
            </li>
          </ul>
        </div>

        <hr className="my-8 border-gray-300"/>

        <p className="text-center text-sm font-mono">
          © 2025 <Link href="/" className="hover:underline">Pawsome™</Link>. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
