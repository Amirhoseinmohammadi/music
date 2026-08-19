'use client'

import {
  Box,
  BoxProps,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'

import { Logo } from './logo'
import { useLanguage } from 'context/language-context'
import siteConfig from '#data/config'

export interface FooterProps extends BoxProps {}

export const Footer: React.FC<FooterProps> = (props) => {
  const { t } = useLanguage()

  return (
    <Box
      id="contact"
      as="footer"
      bg="#000000"
      borderTop="1px solid rgba(255, 255, 255, 0.08)"
      py={12}
      {...props}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" gap={8}>
          
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={1}>
             <Text color="gray.500" fontSize="10px" fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
               {t.footerRights}
             </Text>
          </VStack>

          <HStack spacing={6} wrap="wrap" justify="center">
            <Link href="https://instagram.com" target="_blank" color="white" fontFamily="mono" fontSize="10px" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" _hover={{ color: '#FF1E42' }}>
              INSTAGRAM →
            </Link>
            <Link href="https://t.me" target="_blank" color="white" fontFamily="mono" fontSize="10px" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" _hover={{ color: '#FF1E42' }}>
              TELEGRAM →
            </Link>
            <Link href="https://spotify.com" target="_blank" color="white" fontFamily="mono" fontSize="10px" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" _hover={{ color: '#FF1E42' }}>
              SPOTIFY →
            </Link>
            <Link href="https://soundcloud.com" target="_blank" color="white" fontFamily="mono" fontSize="10px" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" _hover={{ color: '#FF1E42' }}>
              SOUNDCLOUD →
            </Link>
          </HStack>

        </Flex>
      </Container>
    </Box>
  )
}
