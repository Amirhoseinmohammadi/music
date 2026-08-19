'use client'

import * as React from 'react'

export type Language = 'en' | 'fa'

interface Translations {
  navHome: string
  navTracks: string
  navAbout: string
  navContact: string
  heroPre: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  btnDownloadTracks: string
  btnAbout: string
  tracksSectionTitle: string
  tracksSectionSubtitle: string
  play: string
  pause: string
  downloadMp3: string
  downloadDirect: string
  aboutTitle: string
  aboutSubtitle: string
  aboutP1: string
  aboutP2: string
  aboutStatOrigin: string
  aboutStatGenre: string
  aboutStatStyle: string
  aboutStatDistribution: string
  footerRights: string
  footerQuote: string
}

const staticTranslations: Translations = {
  navHome: 'Home',
  navTracks: 'Tracks',
  navAbout: 'About ALDA',
  navContact: 'Contact',
  heroPre: 'Official Portfolio',
  heroTitle: 'ALDA',
  heroSubtitle: 'Voice of the Underground',
  heroDescription:
    'Raw lyrics, hard-hitting rhythms, and authentic Persian rap energy from the streets of Zanjan to Tehran. Stream all studio master tracks and download high-quality files directly below.',
  btnDownloadTracks: 'Listen & Download',
  btnAbout: 'Artist Bio',
  tracksSectionTitle: 'Discography & Master Downloads',
  tracksSectionSubtitle:
    'High-bitrate studio master recordings available for direct download and instant streaming.',
  play: 'Play',
  pause: 'Pause',
  downloadMp3: 'Download MP3',
  downloadDirect: 'Google Drive',
  aboutTitle: 'About ALDA',
  aboutSubtitle: 'Authentic grit, raw poetry, and street flow.',
  aboutP1:
    'ALDA is an Iranian underground rapper and lyricist crafting music rooted in real-life experiences, urban struggle, and cultural narrative. Bridging Zanjan and Tehran underground scenes, his craft pairs sharp poetic flow with bass-heavy hip-hop production.',
  aboutP2:
    'Every project is produced independently and shared directly with authentic listeners—uncompromised and unedited.',
  aboutStatOrigin: 'Zanjan / Tehran',
  aboutStatGenre: 'Persian Underground Rap',
  aboutStatStyle: 'Street Poetry & Heavy 808s',
  aboutStatDistribution: '100% Independent Releases',
  footerRights: 'All Rights Reserved. ALDA Music.',
  footerQuote: 'Real recognizes real. From the heart to the microphone.',
}

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  dir: 'ltr' | 'rtl'
  t: Translations
}

const LanguageContext = React.createContext<LanguageContextValue | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    document.documentElement.setAttribute('dir', 'ltr')
    document.documentElement.setAttribute('lang', 'en')
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        language: 'en',
        setLanguage: () => {},
        toggleLanguage: () => {},
        dir: 'ltr',
        t: staticTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextValue => {
  const context = React.useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
