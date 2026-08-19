'use client'

import { Box, BoxProps, Flex } from '@chakra-ui/react'
import { useScroll } from 'framer-motion'
import * as React from 'react'

import Navigation from './navigation'

export interface HeaderProps extends Omit<BoxProps, 'children'> {}

export const Header: React.FC<HeaderProps> = (props) => {
  const ref = React.useRef<HTMLHeadingElement>(null)
  const [scrolled, setScrolled] = React.useState(false)

  const { scrollY } = useScroll()
  React.useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 20)
    })
  }, [scrollY])

  return (
    <Box
      ref={ref}
      as="header"
      top="6"
      left="50%"
      transform="translateX(-50%)"
      position="fixed"
      backdropFilter="blur(16px)"
      zIndex="sticky"
      transition="all 0.3s ease"
      bg="rgba(15, 15, 15, 0.75)"
      boxShadow={scrolled ? '0 10px 30px rgba(0, 0, 0, 0.8)' : '0 4px 30px rgba(0, 0, 0, 0.5)'}
      border="1px solid rgba(255, 255, 255, 0.12)"
      borderRadius="full"
      px={2}
      py={2}
      {...props}
    >
      <Flex align="center" justify="center">
        <Navigation />
      </Flex>
    </Box>
  )
}
