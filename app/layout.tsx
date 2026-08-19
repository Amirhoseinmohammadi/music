import { ColorModeScript, theme } from '@chakra-ui/react'
import type { Metadata } from 'next'

import { Provider } from './provider'
import { tracks } from '../data/songs'

export const metadata: Metadata = {
  title: 'ALDA | Official Underground Rap & Discography',
  description: 'Raw lyrics, hard-hitting rhythms, and authentic Persian rap energy. Stream all studio master tracks and download high-quality files directly.',
  keywords: ['ALDA', 'underground rap', 'Persian rap', 'music download', 'discography', 'Zanjan rap', 'Tehran rap', 'mp3'],
  openGraph: {
    title: 'ALDA | Official Underground Rap & Discography',
    description: 'Raw lyrics, hard-hitting rhythms, and authentic Persian rap energy.',
    images: ['/static/images/alda.jpeg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALDA | Official Underground Rap & Discography',
    description: 'Raw lyrics, hard-hitting rhythms, and authentic Persian rap energy.',
    images: ['/static/images/alda.jpeg'],
  },
}

export default function Layout(props: { children: React.ReactNode }) {
  const colorMode = theme.config.initialColorMode

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'ALDA',
    image: '/static/images/alda.jpeg',
    description: 'Official Underground Rap & Discography',
    track: tracks.map((track) => ({
      '@type': 'MusicRecording',
      name: track.title,
      duration: track.duration ? `PT${track.duration.replace(':', 'M')}S` : undefined,
      url: track.audioUrl,
    })),
  }

  return (
    <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicons/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`chakra-ui-${colorMode}`}>
        <ColorModeScript initialColorMode={colorMode} />
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
