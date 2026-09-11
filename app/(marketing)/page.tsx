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
import { motion, AnimatePresence } from 'framer-motion'

import { MusicDownloaderList } from '#components/music-downloader'
import { MusicPlayer } from '#components/music-player'
import { useLanguage } from 'context/language-context'
import { tracks } from 'data/songs'

const Home: NextPage = () => {
  const bg = useColorModeValue('#F8F9FA', '#000000')

  return (
    <Box bg={bg} minH="100vh">
      <HeroSection />
      <MusicDownloaderSection />
      <Box maxW="6xl" mx="auto" px={{ base: 4, md: 6 }} pb={{ base: 16, md: 24 }}>
        <MusicPlayer />
      </Box>
      <AboutSection />
    </Box>
  )
}

const heroImages = [
  '/static/images/alda.jpeg',
  '/static/images/picture1.jpg',
  '/static/images/picture2.jpg',
  '/static/images/picture3.jpg',
]

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const heroBg = useColorModeValue('#F8F9FA', '#000000')
  const radialOverlay = useColorModeValue(
    'radial-gradient(circle at center, transparent 0%, rgba(248, 249, 250, 0.4) 65%, #F8F9FA 100%)',
    'radial-gradient(circle at center, transparent 0%, #000000 70%, #000000 100%)'
  )
  const linearOverlay = useColorModeValue(
    'linear(to-b, transparent 0%, rgba(248, 249, 250, 0.6) 70%, #F8F9FA 100%)',
    'linear(to-b, transparent 0%, rgba(0,0,0,0.6) 70%, #000000 100%)'
  )
  const titleColor = useColorModeValue('gray.900', 'white')
  const subtitleColor = useColorModeValue('gray.600', 'gray.400')
  const cornerColor = useColorModeValue('gray.800', 'white')
  const edgeAccentColor = useColorModeValue('gray.600', 'gray.500')

  return (
    <Box id="hero" position="relative" height="100vh" width="100vw" overflow="hidden" bg={heroBg} ml="calc(50% - 50vw)">
      {/* Background Image with Heavy Radial Fade */}
      <Box position="absolute" inset="0" zIndex="0">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt={`ALDA — Iranian Underground Rap & Studio Discography (Slide ${currentImageIndex + 1})`}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              priority={currentImageIndex === 0}
              quality={85}
            />
          </motion.div>
        </AnimatePresence>
        <Box
          position="absolute"
          inset="0"
          bg={radialOverlay}
        />
        <Box
          position="absolute"
          inset="0"
          bgGradient={linearOverlay}
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
          color={subtitleColor}
          fontSize={{ base: '10px', md: 'xs' }}
          fontWeight="bold"
          letterSpacing="0.3em"
          mb={4}
          textTransform="uppercase"
        >
          Persian Underground Rap / From Zanjan to Tehran
        </Text>
        <Heading
          as="h1"
          color={titleColor}
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
        <Text color={edgeAccentColor} fontSize="xs" fontWeight="bold" letterSpacing="widest">
          ✳ SINCE 2020
        </Text>
      </Box>

      <Box position="absolute" top="50%" right={8} transform="translateY(-50%) rotate(90deg)" transformOrigin="right center" zIndex="2" display={{ base: 'none', lg: 'block' }}>
        <Text color={edgeAccentColor} fontSize="xs" fontWeight="bold" letterSpacing="widest">
          ✳ UNDERGROUND RAP
        </Text>
      </Box>

      {/* Bottom Corners */}
      <Flex position="absolute" bottom={8} left={8} right={8} justify="space-between" zIndex="2" align="flex-end">
        {/* Bottom Left */}
        <VStack align="flex-start" spacing={1}>
          <Text color={edgeAccentColor} fontSize="10px" fontWeight="bold" letterSpacing="widest" mb={1}>STREAM</Text>
          <HStack as="a" href="https://soundcloud.com/khodealdahiphop?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" target="_blank" rel="noopener noreferrer" aria-label="Stream ALDA on SoundCloud" color={cornerColor} fontSize="xs" _hover={{ color: '#FF1E42' }} spacing={1}>
            <Text>Soundcloud</Text><Icon as={IconArrowDown} transform="rotate(-135deg)" />
          </HStack>
        </VStack>

        {/* Bottom Right */}
        <VStack align="flex-end" spacing={1}>
          <Text color={edgeAccentColor} fontSize="10px" fontWeight="bold" letterSpacing="widest" mb={1}>CONNECT</Text>
          <HStack as="a" href="https://instagram.com/aldahiphop" target="_blank" rel="noopener noreferrer" aria-label="Follow ALDA on Instagram" color={cornerColor} fontSize="xs" _hover={{ color: '#FF1E42' }} spacing={1}>
            <Text>Instagram</Text><Icon as={IconArrowDown} transform="rotate(-135deg)" />
          </HStack>
          <HStack as="a" href="https://t.me/aldatunes" target="_blank" rel="noopener noreferrer" aria-label="Join ALDA on Telegram" color={cornerColor} fontSize="xs" _hover={{ color: '#FF1E42' }} spacing={1}>
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
  const { t } = useLanguage()

  const aboutBg = useColorModeValue('#F8F9FA', '#000000')
  const aboutBorder = useColorModeValue('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.08)')
  const titleColor = useColorModeValue('gray.900', 'white')
  const p1Color = useColorModeValue('gray.700', 'gray.300')
  const p2Color = useColorModeValue('gray.600', 'gray.500')
  const statLabelColor = useColorModeValue('gray.600', 'gray.500')
  const statValColor = useColorModeValue('gray.900', 'white')

  return (
    <Box as="section" id="about" py={{ base: 20, md: 32 }} bg={aboutBg} borderTop="1px solid" borderColor={aboutBorder}>
      <Container maxW="container.xl">
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: 12, lg: 20 }} alignItems="flex-start">
          {/* Bio Description */}
          <VStack align="flex-start" spacing={6} flex="1">
            <Heading
              as="h2"
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight="bold"
              fontFamily="mono"
              color="#FF1E42"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              About ALDA | درباره علدا
            </Heading>

            <Text
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              fontWeight="900"
              color={titleColor}
              textTransform="uppercase"
              letterSpacing="tighter"
              lineHeight="0.95"
            >
              {t.aboutSubtitle}
            </Text>

            <Box borderLeft="2px solid #FF1E42" pl={6}>
              <Text color={p1Color} fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.8" fontFamily="mono">
                {t.aboutP1}
              </Text>
            </Box>

            <Text color={p2Color} fontSize="sm" lineHeight="tall" fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
              {t.aboutP2}
            </Text>
          </VStack>

          {/* Minimalist Stat Grid */}
          <SimpleGrid columns={1} spacing={0} flex="1" w="full" borderTop="1px solid" borderColor={aboutBorder}>
            <Flex py={6} borderBottom="1px solid" borderColor={aboutBorder} justify="space-between" align="center">
              <HStack spacing={4}>
                <Icon as={IconMapPin} color="#FF1E42" boxSize={5} />
                <Text fontSize="xs" color={statLabelColor} fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
                  Roots & Scene
                </Text>
              </HStack>
              <Text color={statValColor} fontFamily="mono" fontWeight="bold" textTransform="uppercase">
                {t.aboutStatOrigin}
              </Text>
            </Flex>

            <Flex py={6} borderBottom="1px solid" borderColor={aboutBorder} justify="space-between" align="center">
              <HStack spacing={4}>
                <Icon as={IconMicrophone} color="#FF1E42" boxSize={5} />
                <Text fontSize="xs" color={statLabelColor} fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
                  Underground
                </Text>
              </HStack>
              <Text color={statValColor} fontFamily="mono" fontWeight="bold" textTransform="uppercase">
                {t.aboutStatGenre}
              </Text>
            </Flex>

            <Flex py={6} borderBottom="1px solid" borderColor={aboutBorder} justify="space-between" align="center">
              <HStack spacing={4}>
                <Icon as={IconLayersIntersect} color="#FF1E42" boxSize={5} />
                <Text fontSize="xs" color={statLabelColor} fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
                  Flow & Signature
                </Text>
              </HStack>
              <Text color={statValColor} fontFamily="mono" fontWeight="bold" textTransform="uppercase">
                {t.aboutStatStyle}
              </Text>
            </Flex>

            <Flex py={6} borderBottom="1px solid" borderColor={aboutBorder} justify="space-between" align="center">
              <HStack spacing={4}>
                <Icon as={IconDisc} color="#FF1E42" boxSize={5} />
                <Text fontSize="xs" color={statLabelColor} fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
                  Direct Catalog
                </Text>
              </HStack>
              <Text color={statValColor} fontFamily="mono" fontWeight="bold" textTransform="uppercase">
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
