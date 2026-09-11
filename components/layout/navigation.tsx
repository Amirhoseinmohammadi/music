'use client'

import {
  Button,
  HStack,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import * as React from 'react'

import { MobileNavButton, MobileNavContent } from '#components/mobile-nav'
import { NavLink } from '#components/nav-link'
import { useLanguage } from 'context/language-context'
import siteConfig from '#data/config'

const Navigation: React.FC = () => {
  const mobileNav = useDisclosure()

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>(null)

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  return (
    <HStack as="nav" aria-label="Main navigation" spacing="2" flexShrink={0}>
      <Button
        as="a"
        href="#hero"
        aria-label="Scroll to Home Hero section"
        size="sm"
        variant="outline"
        borderColor="whiteAlpha.300"
        color="white"
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        _hover={{ bg: 'whiteAlpha.100', color: 'red.400', borderColor: 'red.400' }}
      >
        INTRO ↓
      </Button>
      <Button
        as="a"
        href="#tracks"
        aria-label="Scroll to Music Discography and Downloads section"
        size="sm"
        variant="outline"
        borderColor="whiteAlpha.300"
        color="white"
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        _hover={{ bg: 'whiteAlpha.100', color: 'red.400', borderColor: 'red.400' }}
      >
        MUSIC ▶
      </Button>
      <Button
        as="a"
        href="#about"
        aria-label="Scroll to About ALDA biography section"
        size="sm"
        variant="outline"
        borderColor="whiteAlpha.300"
        color="white"
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        _hover={{ bg: 'whiteAlpha.100', color: 'red.400', borderColor: 'red.400' }}
      >
        ABOUT ℹ
      </Button>
    </HStack>
  )
}

export default Navigation
