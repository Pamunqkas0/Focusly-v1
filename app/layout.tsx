import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/providers'
import { RegisterServiceWorker } from '@/components/RegisterSW'
import { AmbientBackground } from '@/components/layout/AmbientBackground'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Focusly Pro | Developer Productivity Suite',
  description: 'All your developer tools in one beautiful dashboard.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Focusly Pro',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="text-foreground antialiased selection:bg-primary/20 selection:text-primary relative min-h-screen">
        <AmbientBackground />
        {/* <RegisterServiceWorker /> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
