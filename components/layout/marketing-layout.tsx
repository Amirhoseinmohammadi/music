'use client'

import { Box, SkipNavContent, SkipNavLink } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { MusicPlayer } from '#components/music-player'
import {
  AnnouncementBanner,
  AnnouncementBannerProps,
} from '../announcement-banner'
import { Footer, FooterProps } from './footer'
import { Header, HeaderProps } from './header'

interface LayoutProps {
  children: ReactNode
  announcementProps?: AnnouncementBannerProps
  headerProps?: HeaderProps
  footerProps?: FooterProps
}

export const MarketingLayout: React.FC<LayoutProps> = (props) => {
  const { children, announcementProps, headerProps, footerProps } = props
  return (
    <Box position="relative" minH="100vh">
      <SkipNavLink>Skip to content</SkipNavLink>
      {announcementProps ? <AnnouncementBanner {...announcementProps} /> : null}
      <Header {...headerProps} />
      <Box as="main" pb={{ base: 36, md: 28 }}>
        <SkipNavContent />
        {children}
      </Box>
      <Footer {...footerProps} />

      {/* Global Fixed Bottom Music Player Dock */}
      <Box
        position="fixed"
        bottom={{ base: 3, md: 5 }}
        left="0"
        right="0"
        zIndex="dock"
        px={{ base: 3, md: 6 }}
        pointerEvents="none"
      >
        <Box maxW="6xl" mx="auto" pointerEvents="auto">
          <MusicPlayer />
        </Box>
      </Box>
    </Box>
  )
}
