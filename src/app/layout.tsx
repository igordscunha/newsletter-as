import './globals.css'
import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Newsletter Advogado Socialista',
  description: 'News Socialista',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={fraunces.className}>{children}</body>
    </html>
  )
}
