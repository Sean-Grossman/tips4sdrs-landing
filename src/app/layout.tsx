import type { Metadata } from 'next'
import './globals.css'
import { Montserrat, Open_Sans } from 'next/font/google'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tips4SDRs.org | Recognize Your Sales Development Reps',
  description: 'Tips4SDRs.org - Where you can show appreciation to the SDRs who helped close your deals',
  openGraph: {
    title: 'Tips4SDRs.org | Recognize Your Sales Development Reps',
    description: 'Where you can show appreciation to the SDRs who helped close your deals',
    images: [
      {
        url: '/images/coverImage.png',
        width: 1200,
        height: 630,
        alt: 'Tips4SDRs - Show appreciation to your sales development reps',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tips4SDRs.org | Recognize Your Sales Development Reps',
    description: 'Where you can show appreciation to the SDRs who helped close your deals',
    images: ['/images/coverImage.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
