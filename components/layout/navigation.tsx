'use client'

import {
  Button,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import { IconMoon, IconSun } from '@tabler/icons-react'
import * as React from 'react'

import { MobileNavButton, MobileNavContent } from '#components/mobile-nav'
import { NavLink } from '#components/nav-link'
import { useLanguage } from 'context/language-context'
import siteConfig from '#data/config'

const Navigation: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const mobileNav = useDisclosure()
  const mobileNavBtnRef = React.useRef<HTMLButtonElement>(null)

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  const navBorderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
  const navColor = useColorModeValue('gray.800', 'white')
  const navHoverBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
  const navHoverColor = useColorModeValue('red.600', 'red.400')

  return (
    <HStack as="nav" aria-label="Main navigation" spacing="2" flexShrink={0}>
      <Button
        as="a"
        href="#hero"
        aria-label="Scroll to Home Hero section"
        size="sm"
        variant="outline"
        borderColor={navBorderColor}
        color={navColor}
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        _hover={{ bg: navHoverBg, color: navHoverColor, borderColor: navHoverColor }}
      >
        INTRO ↓
      </Button>
      <Button
        as="a"
        href="#tracks"
        aria-label="Scroll to Music Discography and Downloads section"
        size="sm"
        variant="outline"
        borderColor={navBorderColor}
        color={navColor}
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        _hover={{ bg: navHoverBg, color: navHoverColor, borderColor: navHoverColor }}
      >
        MUSIC ▶
      </Button>
      <Button
        as="a"
        href="#about"
        aria-label="Scroll to About ALDA biography section"
        size="sm"
        variant="outline"
        borderColor={navBorderColor}
        color={navColor}
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        _hover={{ bg: navHoverBg, color: navHoverColor, borderColor: navHoverColor }}
      >
        ABOUT ℹ
      </Button>

      {/* Light / Dark Mode Toggle Button */}
      <IconButton
        aria-label={
          mounted && colorMode === 'light'
            ? 'Switch to dark theme'
            : 'Switch to light theme'
        }
        title={
          mounted && colorMode === 'light'
            ? 'Switch to dark theme'
            : 'Switch to light theme'
        }
        icon={
          mounted && colorMode === 'light' ? (
            <IconMoon size={16} />
          ) : (
            <IconSun size={16} />
          )
        }
        size="sm"
        variant="outline"
        borderColor={navBorderColor}
        color={navColor}
        borderRadius="full"
        fontSize="xs"
        _hover={{ bg: navHoverBg, color: navHoverColor, borderColor: navHoverColor }}
        onClick={toggleColorMode}
      />
    </HStack>
  )
}

export default Navigation
