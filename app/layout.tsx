import { ColorModeScript } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Provider } from './provider'
import { tracks } from '../data/songs'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://alda-music.vercel.app')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ALDA (علدا) | Official Music & Discography',
    template: '%s | ALDA',
  },
  description:
    'Official discography, music streaming, and direct studio master downloads for ALDA (علدا) — Persian underground rapper. دانلود مستقیم آهنگ های علدا از زنجان تا تهران.',
  keywords: [
    'ALDA',
    'علدا',
    'علدا زنجان',
    'دانلود آهنگ علدا',
    'آهنگ های علدا',
    'رپ علدا',
    'رپ زنجان',
    'Persian rap',
    'Iranian underground rap',
    'underground rap',
    'رپ فارسی',
    'Ashkanmadz',
    'Gangam Pore',
    'Namak Nadare',
  ],
  authors: [{ name: 'ALDA' }],
  creator: 'ALDA',
  publisher: 'ALDA',
  alternates: {
    canonical: 'https://alda-music.vercel.app/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fa_IR'],
    url: 'https://alda-music.vercel.app/',
    siteName: 'ALDA Music',
    title: 'ALDA (علدا) | Official Music & Discography',
    description:
      'Official discography, music streaming, and direct studio master downloads for ALDA (علدا) — Persian underground rapper. دانلود مستقیم آهنگ های علدا.',
    images: [
      {
        url: '/static/images/alda.jpeg',
        width: 1200,
        height: 1200,
        alt: 'ALDA (علدا) — Official Underground Rap & Discography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALDA (علدا) | Official Music & Discography',
    description:
      'Official discography, music streaming, and direct studio master downloads for ALDA (علدا). Persian underground rap.',
    images: ['/static/images/alda.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/static/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/static/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/static/favicons/favicon.ico' },
    ],
    apple: [
      { url: '/static/favicons/apple-touch-icon.png', sizes: '76x76' },
      { url: '/static/favicons/apple-icon-180x180.png', sizes: '180x180' },
    ],
  },
  manifest: '/static/favicons/manifest.json',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
}

function formatDurationToIso(duration?: string): string | undefined {
  if (!duration || !duration.includes(':')) return undefined
  const parts = duration.split(':')
  if (parts.length === 2) {
    const mins = parseInt(parts[0], 10)
    const secs = parseInt(parts[1], 10)
    if (!isNaN(mins) && !isNaN(secs)) {
      return `PT${mins}M${secs}S`
    }
  }
  return undefined
}

export default function Layout(props: { children: React.ReactNode }) {
  const colorMode = 'dark'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    '@id': `${siteUrl}/#artist`,
    name: 'ALDA',
    alternateName: 'علدا',
    description:
      'Official discography and direct master downloads for ALDA (علدا) — Persian underground hip-hop artist from Zanjan and Tehran.',
    url: siteUrl,
    image: `${siteUrl}/static/images/alda.jpeg`,
    genre: ['Persian Hip-Hop', 'Underground Rap', 'Hip-Hop/Rap'],
    sameAs: [
      'https://instagram.com/aldahiphop',
      'https://t.me/aldatunes',
      'https://soundcloud.com/khodealdahiphop',
    ],
    track: tracks.map((track) => {
      const audioUrl = track.audioUrl.startsWith('http')
        ? track.audioUrl
        : `${siteUrl}${encodeURI(track.audioUrl)}`
      const imageUrl = `${siteUrl}/static/images/alda.jpeg`
      const trackUrl = `${siteUrl}/#track-${track.id}`

      return {
        '@type': 'MusicRecording',
        '@id': trackUrl,
        name: track.title,
        alternateName: track.titleFa || undefined,
        url: trackUrl,
        image: imageUrl,
        duration: formatDurationToIso(track.duration),
        datePublished: track.releaseDate || '2024',
        inAlbum: {
          '@type': 'MusicAlbum',
          name: track.album || 'Single',
        },
        byArtist: {
          '@type': 'MusicGroup',
          name: 'ALDA',
          alternateName: 'علدا',
          '@id': `${siteUrl}/#artist`,
        },
        audio: {
          '@type': 'AudioObject',
          name: `${track.artist} - ${track.title}`,
          contentUrl: audioUrl,
          encodingFormat: 'audio/mpeg',
        },
      }
    }),
  }

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`chakra-ui-${colorMode}`} suppressHydrationWarning>
        <ColorModeScript initialColorMode="dark" />
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
