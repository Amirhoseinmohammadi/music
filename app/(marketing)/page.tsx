'use client'

import {
  Badge,
  Box,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Image from 'next/image'
import * as React from 'react'
import {
  IconArrowDown,
  IconDisc,
  IconDownload,
  IconHeadphones,
  IconLayersIntersect,
  IconMapPin,
  IconMicrophone,
  IconMusic,
} from '@tabler/icons-react'

import { MusicDownloaderList } from '#components/music-downloader'
import { useLanguage } from 'context/language-context'
import { tracks } from 'data/songs'

const Home: NextPage = () => {
  return (
    <Box bg="#000000" minH="100vh">
      <HeroSection />
      <MusicDownloaderSection />
      <AboutSection />
    </Box>
  )
}

const HeroSection: React.FC = () => {
  return (
    <Box id="hero" position="relative" height="100vh" width="100vw" overflow="hidden" bg="#000000" ml="calc(50% - 50vw)">
      {/* Background Image with Heavy Radial Fade */}
      <Box position="absolute" inset="0" zIndex="0">
        <Image
          src="/static/images/alda.jpeg"
          alt="ALDA Rapper"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          priority
          quality={90}
        />
        <Box
          position="absolute"
          inset="0"
          bg="radial-gradient(circle at center, transparent 0%, #000000 70%, #000000 100%)"
        />
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, transparent 0%, rgba(0,0,0,0.6) 70%, #000000 100%)"
        />
      </Box>

      {/* Centerpiece Content */}
      <Flex
        position="absolute"
        inset="0"
        zIndex="1"
        direction="column"
        align="center"
        justify="flex-end"
        pb={{ base: 24, md: 32 }}
        pointerEvents="none"
      >
        <Text
          color="gray.400"
          fontSize={{ base: '10px', md: 'xs' }}
          fontWeight="bold"
          letterSpacing="0.3em"
          mb={4}
          textTransform="uppercase"
        >
          Rapper & Producer / From Zanjan
        </Text>
        <Heading
          as="h1"
          color="white"
          fontSize={{ base: '6xl', sm: '8xl', md: '10xl', lg: '12xl' }}
          fontWeight="900"
          letterSpacing="0.1em"
          lineHeight="0.8"
          textTransform="uppercase"
        >
          ALDA
        </Heading>
      </Flex>

      {/* Edge Accents */}
      <Box position="absolute" top="50%" left={8} transform="translateY(-50%) rotate(-90deg)" transformOrigin="left center" zIndex="2" display={{ base: 'none', lg: 'block' }}>
        <Text color="gray.500" fontSize="xs" fontWeight="bold" letterSpacing="widest">
          ✳ SINCE 2020
        </Text>
      </Box>

      <Box position="absolute" top="50%" right={8} transform="translateY(-50%) rotate(90deg)" transformOrigin="right center" zIndex="2" display={{ base: 'none', lg: 'block' }}>
        <Text color="gray.500" fontSize="xs" fontWeight="bold" letterSpacing="widest">
          ✳ UNDERGROUND RAP
        </Text>
      </Box>

      {/* Bottom Corners */}
      <Flex position="absolute" bottom={8} left={8} right={8} justify="space-between" zIndex="2" align="flex-end">
        {/* Bottom Left */}
        <VStack align="flex-start" spacing={1}>
          <Text color="gray.500" fontSize="10px" fontWeight="bold" letterSpacing="widest" mb={1}>STREAM</Text>
          <HStack as="a" href="https://spotify.com" target="_blank" color="white" fontSize="xs" _hover={{ color: '#FF1E42' }} spacing={1}>
            <Text>Spotify</Text><Icon as={IconArrowDown} transform="rotate(-135deg)" />
          </HStack>
          <HStack as="a" href="https://soundcloud.com" target="_blank" color="white" fontSize="xs" _hover={{ color: '#FF1E42' }} spacing={1}>
            <Text>Soundcloud</Text><Icon as={IconArrowDown} transform="rotate(-135deg)" />
          </HStack>
          <HStack as="a" href="https://youtube.com" target="_blank" color="white" fontSize="xs" _hover={{ color: '#FF1E42' }} spacing={1}>
            <Text>YouTube</Text><Icon as={IconArrowDown} transform="rotate(-135deg)" />
          </HStack>
        </VStack>

        {/* Bottom Right */}
        <VStack align="flex-end" spacing={1}>
          <Text color="gray.500" fontSize="10px" fontWeight="bold" letterSpacing="widest" mb={1}>CONNECT</Text>
          <HStack as="a" href="https://instagram.com" target="_blank" color="white" fontSize="xs" _hover={{ color: '#FF1E42' }} spacing={1}>
            <Text>Instagram</Text><Icon as={IconArrowDown} transform="rotate(-135deg)" />
          </HStack>
          <HStack as="a" href="https://t.me" target="_blank" color="white" fontSize="xs" _hover={{ color: '#FF1E42' }} spacing={1}>
            <Text>Telegram</Text><Icon as={IconArrowDown} transform="rotate(-135deg)" />
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}

const MusicDownloaderSection: React.FC = () => {
  const { t } = useLanguage()

  return (
    <Container maxW="container.xl">
      <MusicDownloaderList
        id="tracks"
        title={t.tracksSectionTitle}
        description={t.tracksSectionSubtitle}
        tracks={tracks}
      />
    </Container>
  )
}

const AboutSection: React.FC = () => {
  const { t, language } = useLanguage()

  return (
    <Box id="about" py={{ base: 20, md: 32 }} bg="#000000" borderTop="1px solid rgba(255, 255, 255, 0.08)">
      <Container maxW="container.xl">
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: 12, lg: 20 }} alignItems="flex-start">
          {/* Bio Description */}
          <VStack align="flex-start" spacing={8} flex="1">
            <Heading
              fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
              fontWeight="900"
              color="white"
              textTransform="uppercase"
              letterSpacing="tighter"
              lineHeight="0.9"
            >
              {t.aboutSubtitle}
            </Heading>

            <Box borderLeft="2px solid #FF1E42" pl={6}>
              <Text color="gray.300" fontSize={{ base: 'md', md: 'xl' }} lineHeight="1.8" fontFamily="mono">
                {t.aboutP1}
              </Text>
            </Box>

            <Text color="gray.500" fontSize="sm" lineHeight="tall" fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
              {t.aboutP2}
            </Text>
          </VStack>

          {/* Minimalist Stat Grid */}
          <SimpleGrid columns={1} spacing={0} flex="1" w="full" borderTop="1px solid rgba(255, 255, 255, 0.08)">
            <Flex py={6} borderBottom="1px solid rgba(255, 255, 255, 0.08)" justify="space-between" align="center">
              <HStack spacing={4}>
                <Icon as={IconMapPin} color="#FF1E42" boxSize={5} />
                <Text fontSize="xs" color="gray.500" fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
                  Roots & Scene
                </Text>
              </HStack>
              <Text color="white" fontFamily="mono" fontWeight="bold" textTransform="uppercase">
                {t.aboutStatOrigin}
              </Text>
            </Flex>

            <Flex py={6} borderBottom="1px solid rgba(255, 255, 255, 0.08)" justify="space-between" align="center">
              <HStack spacing={4}>
                <Icon as={IconMicrophone} color="#FF1E42" boxSize={5} />
                <Text fontSize="xs" color="gray.500" fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
                  Underground
                </Text>
              </HStack>
              <Text color="white" fontFamily="mono" fontWeight="bold" textTransform="uppercase">
                {t.aboutStatGenre}
              </Text>
            </Flex>

            <Flex py={6} borderBottom="1px solid rgba(255, 255, 255, 0.08)" justify="space-between" align="center">
              <HStack spacing={4}>
                <Icon as={IconLayersIntersect} color="#FF1E42" boxSize={5} />
                <Text fontSize="xs" color="gray.500" fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
                  Flow & Signature
                </Text>
              </HStack>
              <Text color="white" fontFamily="mono" fontWeight="bold" textTransform="uppercase">
                {t.aboutStatStyle}
              </Text>
            </Flex>

            <Flex py={6} borderBottom="1px solid rgba(255, 255, 255, 0.08)" justify="space-between" align="center">
              <HStack spacing={4}>
                <Icon as={IconDisc} color="#FF1E42" boxSize={5} />
                <Text fontSize="xs" color="gray.500" fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
                  Direct Catalog
                </Text>
              </HStack>
              <Text color="white" fontFamily="mono" fontWeight="bold" textTransform="uppercase">
                {t.aboutStatDistribution}
              </Text>
            </Flex>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}

export default Home
