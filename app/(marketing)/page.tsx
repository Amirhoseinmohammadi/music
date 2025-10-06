'use client'

import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { Br, Link } from '@saas-ui/react'
import type { Metadata, NextPage } from 'next'
import Image from 'next/image'
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { Faq } from '#components/faq'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Hero } from '#components/hero'
import { ChakraLogo, NextjsLogo } from '#components/logos'
import { FallInPlace } from '#components/motion/fall-in-place'
import { MusicDownloaderList } from '#components/music-downloader'

export const meta: Metadata = {
  title: 'Saas UI Landingspage',
  description: 'Free SaaS landingspage starter kit',
}

const Home: NextPage = () => {
  return (
    <Box>
      <HeroSection />

      <MusicDownloaderSection />
    </Box>
  )
}

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: 'column', lg: 'row' }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Where
                <Br />
                Emotions Sing
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                ALDA isn't just a rapper; he's a lyricist from the heart of
                Zanjan, Iran. With a voice described as "raw and powerful," he
                crafts rhymes drawn from the rugged streets and personal
                experiences—from the hustle of Tehran to great triumphs echoing
                the ancient vibes of Persian heritage.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="4" pb="12" spacing="8">
                <NextjsLogo height="28px" /> <ChakraLogo height="20px" />
              </HStack>

              <ButtonGroup spacing={4} alignItems="center">
                <ButtonLink colorScheme="primary" size="lg" href="/signup">
                  Sign Up
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="https://demo.saas-ui.dev"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: 'common',
                        transitionDuration: 'normal',
                        '.chakra-button:hover &': {
                          transform: 'translate(5px)',
                        },
                      }}
                    />
                  }
                >
                  View demo
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: 'none', lg: 'block' }}
            left={{ lg: '60%', xl: '55%' }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
                <Image
                  src="/static/images/alda.jpeg"
                  width={500}
                  height={500}
                  alt="Screenshot of a ListPage in Saas UI Pro"
                  quality="75"
                  priority
                />
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

const MusicDownloaderSection = () => {
  return (
    <MusicDownloaderList
      id="music"
      title={
        <Heading
          lineHeight="short"
          fontSize={['2xl', null, '4xl']}
          textAlign="left"
          as="p"
        >
          Top Tracks
          <Br /> to Download
        </Heading>
      }
      description={
        <>
          Listen and download your favorite tracks directly from here.
          <Br />
          All tracks are ready to play and fully responsive.
        </>
      }
      columns={[1, 2, 3]}
      musics={[
        {
          title: 'A Sky Full of Stars',
          artist: 'Coldplay',
          imageUrl: '/S.webp.jpg',
          downloadUrl: '#',
          duration: '4:20',
          progress: 45,
        },
        {
          title: 'Blinding Lights',
          artist: 'The Weeknd',
          imageUrl: '/blinding-lights.jpg',
          downloadUrl: '#',
          duration: '3:22',
          progress: 60,
        },
        {
          title: 'Shape of You',
          artist: 'Ed Sheeran',
          imageUrl: '/shape-of-you.jpg',
          downloadUrl: '#',
          duration: '3:54',
          progress: 30,
        },
      ]}
    />
  )
}

export default Home
