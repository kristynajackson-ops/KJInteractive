import type { Metadata } from 'next'
import { Montserrat, Roboto, Inter } from 'next/font/google'
import './globals.css'
import Nav from '../components/Nav'
import { LinkedInFooterLogo } from '../components/LinkedInFooterLogo'

const montserrat = Montserrat({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'KJ Interactive',
  description: 'My professional portfolio',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
        <footer className="bg-gradient-to-r from-[#5f5e5c] to-[#6a6665] text-white py-4 mt-0 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex-1 flex justify-end">
              <LinkedInFooterLogo />
            </div>
            <span className="flex-1 text-right text-xs">&copy; Kristyn Jackson, 2026. All rights reserved.</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
