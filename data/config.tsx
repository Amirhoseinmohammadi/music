import { IconBrandInstagram, IconBrandSoundcloud, IconBrandTelegram } from '@tabler/icons-react'

export interface SeoConfig {
  title: string
  description: string
}

const siteConfig = {
  seo: {
    title: 'ALDA (علدا) | Official Music & Discography',
    description: 'Official discography and direct track downloads for ALDA (علدا) - Persian Underground Rap.',
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
        labelFa: 'درباره علدا',
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
        href: 'https://instagram.com/aldahiphop',
        label: <IconBrandInstagram size={18} stroke={1.5} />,
      },
      {
        href: 'https://t.me/aldatunes',
        label: <IconBrandTelegram size={18} stroke={1.5} />,
      },
      {
        href: 'https://soundcloud.com',
        label: <IconBrandSoundcloud size={18} stroke={1.5} />,
      },
    ],
  },
}

export default siteConfig
