'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black py-12 px-8 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logos/logoWhite.svg"
              alt="AMAGE"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Info Central */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 text-center md:text-left">
            <div>
              <p className="text-gray-500 text-sm mb-1">CNPJ</p>
              <p className="text-white">00.000.000/0001-00</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm mb-1">Contato</p>
              <a 
                href="mailto:contato@amage.com" 
                className="text-white hover:text-[#00B4D8] transition-colors"
              >
                contato@amage.com
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {/* Instagram */}
            <motion.a
              href="https://instagram.com/amage"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                rotate: 10,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white group-hover:text-[#E4405F] transition-colors duration-200"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"
                  fill="currentColor"
                />
              </svg>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                rotate: 10,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white group-hover:text-[#25D366] transition-colors duration-200"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                  fill="currentColor"
                />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800/30 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 AMAGE. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}