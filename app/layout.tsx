import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FIRE | FilipinoHomes Institute of Real Estate',
  description: 'FIRE (FilipinoHomes Institute of Real Estate) offers comprehensive online short courses—Brokerage Essentials, Rental Management, Investment Analysis—for aspiring and seasoned real estate professionals in the Philippines.',
  generator: 'v0.dev',
  authors: [{ name: 'FilipinoHomes Institute of Real Estate', url: 'https://realestatetraining.ph' }],
  keywords: [
    'real estate training',
    'online real estate course',
    'brokerage essentials',
    'rental management',
    'investment analysis',
    'FIRE',
    'FilipinoHomes',
    'Philippines real estate'
  ],
  openGraph: {
    title: 'FIRE | FilipinoHomes Institute of Real Estate',
    description: 'Comprehensive online courses for real estate professionals: Brokerage Essentials, Rental Management, Investment Analysis.',
    url: 'https://realestatetraining.ph',
    siteName: 'FIRE',
    type: 'website',
    images: [
      {
        url: 'https://realestatetraining.ph/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FIRE – FilipinoHomes Institute of Real Estate logo and branding'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIRE | FilipinoHomes Institute of Real Estate',
    description: 'Enroll in FIRE’s online short courses for real estate professionals in the Philippines.',
    // You can use the same image as Open Graph if hosted and accessible:
    images: ['https://realestatetraining.ph/og-image.png']
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
