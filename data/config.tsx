import * as React from 'react'
import { FaInstagram, FaSoundcloud, FaSpotify, FaTelegramPlane, FaYoutube } from 'react-icons/fa'

export interface SeoConfig {
  title: string
  description: string
}

const siteConfig = {
  seo: {
    title: 'ALDA | Official Music Portfolio',
    description: 'Official discography and direct track downloads for ALDA - Persian Underground Rap.',
  } as SeoConfig,
  header: {
    links: [
      {
        id: 'hero',
        label: 'Home',
        labelFa: 'خانه',
        href: '#hero',
      },
      {
        id: 'tracks',
        label: 'Tracks',
        labelFa: 'آهنگ‌ها',
        href: '#tracks',
      },
      {
        id: 'about',
        label: 'About ALDA',
        labelFa: 'درباره آلدا',
        href: '#about',
      },
      {
        id: 'contact',
        label: 'Contact',
        labelFa: 'ارتباط',
        href: '#contact',
      },
    ],
  },
  footer: {
    copyright: '© ALDA. All rights reserved.',
    links: [
      {
        href: 'https://instagram.com',
        label: <FaInstagram size="18" />,
      },
      {
        href: 'https://t.me',
        label: <FaTelegramPlane size="18" />,
      },
      {
        href: 'https://youtube.com',
        label: <FaYoutube size="18" />,
      },
      {
        href: 'https://spotify.com',
        label: <FaSpotify size="18" />,
      },
      {
        href: 'https://soundcloud.com',
        label: <FaSoundcloud size="18" />,
      },
    ],
  },
}

export default siteConfig
