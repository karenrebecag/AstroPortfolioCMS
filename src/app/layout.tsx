import React from 'react'
import './styles.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio CMS - Karen Ortiz',
  description: 'Content Management System for Karen Ortiz\'s portfolio. Design Engineer specializing in UX/UI design, React development, and AI-driven web solutions.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  themeColor: '#4523AE',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Portfolio CMS',
  },
  openGraph: {
    title: 'Portfolio CMS - Karen Ortiz',
    description: 'Content Management System for Karen Ortiz\'s portfolio. Design Engineer specializing in UX/UI design, React development, and AI-driven web solutions.',
    siteName: 'Karen Ortiz Portfolio CMS',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="msapplication-TileColor" content="#060314" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
