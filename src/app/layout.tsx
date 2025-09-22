import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Betz - Sports Betting Platform',
  description: 'Win big with every bet. Experience the thrill of sports betting with live odds, instant payouts, and the most competitive lines in the game.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          {children}
        </div>
      </body>
    </html>
  )
}
