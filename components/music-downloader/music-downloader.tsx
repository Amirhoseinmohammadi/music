'use client'

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { IconDownload, IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react'
import * as React from 'react'

import { Section } from 'components/section'
import { useAudio } from 'context/audio-context'
import { useLanguage } from 'context/language-context'
import { Track } from 'data/songs'

export interface MusicDownloaderProps {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  tracks: Track[]
}

interface TrackCardProps {
  track: Track
  isPlaying: boolean
  onTogglePlay: (track: Track) => void
}

const TrackCard: React.FC<TrackCardProps> = ({ track, isPlaying, onTogglePlay }) => {
  const { language } = useLanguage()
  const displayTitle = language === 'fa' ? track.titleFa || track.title : track.title
  const displayAlbum = language === 'fa' ? track.albumFa || track.album : track.album

  // Use static image directly for fast edge caching without serverless metadata extraction latency
  const imageSource = track.imageUrl || '/static/images/alda.jpeg'

  const hasCustomDriveLink = Boolean(
    track.driveDownloadUrl &&
      !track.driveDownloadUrl.includes('DRIVE_ID') &&
      !track.driveDownloadUrl.includes('YOUR_GDRIVE') &&
      track.driveDownloadUrl.startsWith('http')
  )
  const downloadHref = hasCustomDriveLink ? track.driveDownloadUrl : track.audioUrl
  const downloadFilename = `${track.artist} - ${track.title}.mp3`

  const imageAlt = `${track.artist} - ${track.title}${track.titleFa ? ` (${track.titleFa})` : ''} - Studio Master`

  return (
    <Flex
      as="article"
      id={`track-${track.id}`}
      bg="#000000"
      borderBottom="1px solid"
      borderColor="rgba(255, 255, 255, 0.08)"
      p={4}
      align="center"
      justify="space-between"
      transition="all 0.2s"
      _hover={{ bg: 'rgba(255, 30, 66, 0.05)' }}
    >
      <HStack spacing={4}>
        {/* Vinyl-style Avatar */}
        <Box
          position="relative"
          w="48px"
          h="48px"
          borderRadius="full"
          overflow="hidden"
          border="1px solid rgba(255, 255, 255, 0.1)"
          flexShrink={0}
        >
          <Image
            src={imageSource}
            w="100%"
            h="100%"
            objectFit="cover"
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            fallbackSrc="/static/images/alda.jpeg"
          />
          <Flex
            position="absolute"
            inset="0"
            bg="rgba(0,0,0,0.5)"
            align="center"
            justify="center"
            cursor="pointer"
            onClick={() => onTogglePlay(track)}
            _hover={{ bg: 'rgba(0,0,0,0.7)' }}
            aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
            role="button"
          >
            <Icon
              as={isPlaying ? IconPlayerPause : IconPlayerPlay}
              color={isPlaying ? '#FF1E42' : 'white'}
            />
          </Flex>
        </Box>

        {/* Track Info */}
        <VStack align="flex-start" spacing={1}>
          <Heading
            as="h3"
            color={isPlaying ? '#FF1E42' : 'white'}
            fontFamily="mono"
            fontSize={{ base: 'xs', md: 'sm' }}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="widest"
            m={0}
            lineHeight="shorter"
          >
            {track.title}
            {track.titleFa && (
              <Text
                as="span"
                color="gray.400"
                fontWeight="normal"
                fontSize="xs"
                ml={2}
                letterSpacing="normal"
              >
                ({track.titleFa})
              </Text>
            )}
          </Heading>
          <HStack
            spacing={2}
            color="gray.500"
            fontSize="10px"
            fontFamily="mono"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            <Text as="span">{track.duration || '0:00'}</Text>
            {displayAlbum && <Text as="span">| {displayAlbum}</Text>}
            <Text as="span">| {track.artist}</Text>
          </HStack>
        </VStack>
      </HStack>

      <Button
        as="a"
        href={downloadHref}
        download={hasCustomDriveLink ? undefined : downloadFilename}
        target={hasCustomDriveLink ? '_blank' : undefined}
        rel={hasCustomDriveLink ? 'noopener noreferrer' : undefined}
        size="sm"
        variant="outline"
        borderColor="rgba(255, 255, 255, 0.2)"
        color="white"
        borderRadius="full"
        fontFamily="mono"
        fontSize="10px"
        fontWeight="bold"
        letterSpacing="widest"
        _hover={{ bg: '#FF1E42', borderColor: '#FF1E42', color: 'white' }}
        leftIcon={<IconDownload />}
        aria-label={`Download ${track.artist} - ${track.title} MP3`}
        title={`Download ${track.artist} - ${track.title} MP3`}
      >
        DL
      </Button>
    </Flex>
  )
}

export const MusicDownloaderList: React.FC<MusicDownloaderProps> = ({
  id = 'tracks',
  title,
  description,
  tracks,
}) => {
  const { currentTrack, isPlaying, selectTrack, togglePlay } = useAudio()

  const handleTogglePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay()
    } else {
      selectTrack(track)
    }
  }

  return (
    <Section id={id} py="20" bg="#000000">
      <VStack spacing={12} align="stretch" maxW="3xl" mx="auto">
        {(title || description) && (
          <VStack align="flex-start" spacing={4}>
            {title && (
              <Heading
                as="h2"
                size="xl"
                fontFamily="mono"
                textTransform="uppercase"
                letterSpacing="widest"
                color="white"
              >
                {title}
              </Heading>
            )}
            {description && (
              <Text
                fontFamily="mono"
                fontSize="sm"
                color="gray.500"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {description}
              </Text>
            )}
          </VStack>
        )}

        <Box borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.08)">
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isPlaying={currentTrack?.id === track.id && isPlaying}
              onTogglePlay={handleTogglePlay}
            />
          ))}
        </Box>
      </VStack>
    </Section>
  )
}
