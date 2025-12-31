import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '2026 - Paipaiio',
  description: 'Welcome to 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

