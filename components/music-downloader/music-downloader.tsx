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
import * as mm from 'music-metadata-browser'
import * as React from 'react'
import { FiDownload, FiPause, FiPlay } from 'react-icons/fi'

import { Section, SectionTitle } from 'components/section'
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
  const [coverUrl, setCoverUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    let isMounted = true
    let createdBlobUrl: string | null = null

    const loadEmbeddedCover = async () => {
      if (!track.audioUrl) return

      try {
        const response = await fetch(track.audioUrl)
        if (!response.ok) throw new Error(`HTTP error ${response.status}`)
        const audioBlob = await response.blob()
        const metadata = await mm.parseBlob(audioBlob)

        if (metadata.common.picture && metadata.common.picture.length > 0) {
          const pic = metadata.common.picture[0]
          const imageBlob = new Blob([pic.data], { type: pic.format || 'image/jpeg' })
          createdBlobUrl = URL.createObjectURL(imageBlob)
          if (isMounted) {
            setCoverUrl(createdBlobUrl)
          }
        }
      } catch (err) {
        // Fallback silently
      }
    }

    loadEmbeddedCover()

    return () => {
      isMounted = false
      if (createdBlobUrl) {
        URL.revokeObjectURL(createdBlobUrl)
      }
    }
  }, [track.audioUrl])

  const displayTitle = language === 'fa' ? track.titleFa || track.title : track.title
  const displayAlbum = language === 'fa' ? track.albumFa || track.album : track.album
  const imageSource = coverUrl || '/static/images/alda.jpeg'

  const hasCustomDriveLink =
    track.driveDownloadUrl &&
    !track.driveDownloadUrl.includes('DRIVE_ID') &&
    !track.driveDownloadUrl.includes('YOUR_GDRIVE') &&
    track.driveDownloadUrl.startsWith('http')
  const downloadHref = hasCustomDriveLink ? track.driveDownloadUrl : track.audioUrl
  const downloadFilename = `${track.artist} - ${track.title}.mp3`

  return (
    <Flex
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
          <Image src={imageSource} w="100%" h="100%" objectFit="cover" alt="cover" fallbackSrc="/static/images/alda.jpeg" />
          <Flex
            position="absolute"
            inset="0"
            bg="rgba(0,0,0,0.5)"
            align="center"
            justify="center"
            cursor="pointer"
            onClick={() => onTogglePlay(track)}
            _hover={{ bg: 'rgba(0,0,0,0.7)' }}
          >
            <Icon as={isPlaying ? FiPause : FiPlay} color={isPlaying ? '#FF1E42' : 'white'} />
          </Flex>
        </Box>
        
        {/* Track Info */}
        <VStack align="flex-start" spacing={1}>
          <Text
            color={isPlaying ? '#FF1E42' : 'white'}
            fontFamily="mono"
            fontSize={{ base: 'xs', md: 'sm' }}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            {displayTitle}
          </Text>
          <HStack spacing={2} color="gray.500" fontSize="10px" fontFamily="mono" textTransform="uppercase" letterSpacing="widest">
            <Text>{track.duration || '0:00'}</Text>
            {displayAlbum && <Text>| {displayAlbum}</Text>}
          </HStack>
        </VStack>
      </HStack>

      <Button
        as="a"
        href={downloadHref}
        download={downloadFilename}
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
        leftIcon={<FiDownload />}
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
  const [currentPlayingId, setCurrentPlayingId] = React.useState<string | null>(null)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const { language } = useLanguage()

  const togglePlay = (track: Track) => {
    if (!track.audioUrl) return

    if (currentPlayingId === track.id) {
      audioRef.current?.pause()
      setCurrentPlayingId(null)
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl
        audioRef.current.play()
        setCurrentPlayingId(track.id)
      }
    }
  }

  return (
    <Section id={id} py="20" bg="#000000">
      <audio
        ref={audioRef}
        onEnded={() => setCurrentPlayingId(null)}
        style={{ display: 'none' }}
      />

      <VStack spacing={12} align="stretch" maxW="3xl" mx="auto">
        {(title || description) && (
          <VStack align="flex-start" spacing={4}>
            {title && (
              <Heading as="h2" size="xl" fontFamily="mono" textTransform="uppercase" letterSpacing="widest" color="white">
                {title}
              </Heading>
            )}
            {description && (
              <Text fontFamily="mono" fontSize="sm" color="gray.500" letterSpacing="widest" textTransform="uppercase">
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
              isPlaying={currentPlayingId === track.id}
              onTogglePlay={togglePlay}
            />
          ))}
        </Box>
      </VStack>
    </Section>
  )
}
