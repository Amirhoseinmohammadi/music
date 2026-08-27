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
  const displayTitle = language === 'fa' ? track.titleFa || track.title : track.title
  const displayAlbum = language === 'fa' ? track.albumFa || track.album : track.album
  
  const [coverImage, setCoverImage] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (track.audioUrl) {
      if (typeof window !== 'undefined') {
        import('jsmediatags').then((jsmediatags) => {
          jsmediatags.default.read(track.audioUrl, {
            onSuccess: function (tag: any) {
              const picture = tag.tags.picture
              if (picture) {
                let base64String = ''
                for (let i = 0; i < picture.data.length; i++) {
                  base64String += String.fromCharCode(picture.data[i])
                }
                const base64 = 'data:' + picture.format + ';base64,' + window.btoa(base64String)
                setCoverImage(base64)
              }
            },
            onError: function (error: any) {
              console.log('Error reading tags for ' + track.title, error)
            }
          })
        }).catch((e) => {
          console.error("jsmediatags could not be loaded", e)
        })
      }
    }
  }, [track.audioUrl, track.title])

  const fallbackImage = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(track.title)}&backgroundColor=000000,FF1E42,1a1a1a&textColor=ffffff`
  const imageSource = coverImage || track.imageUrl || fallbackImage

  const hasCustomDriveLink = Boolean(
    track.driveDownloadUrl &&
    !track.driveDownloadUrl.includes('DRIVE_ID') &&
    !track.driveDownloadUrl.includes('YOUR_GDRIVE') &&
    track.driveDownloadUrl.startsWith('http')
  )
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
            <Icon as={isPlaying ? IconPlayerPause : IconPlayerPlay} color={isPlaying ? '#FF1E42' : 'white'} />
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
  const [isPlaying, setIsPlaying] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const { language } = useLanguage()

  const togglePlay = (track: Track) => {
    if (!track.audioUrl) return

    if (currentPlayingId === track.id) {
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl
        audioRef.current.play()
        setCurrentPlayingId(track.id)
        setIsPlaying(true)
      }
    }
  }

  return (
    <Section id={id} py="20" bg="#000000">
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
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
              isPlaying={currentPlayingId === track.id && isPlaying}
              onTogglePlay={togglePlay}
            />
          ))}
        </Box>
      </VStack>
    </Section>
  )
}
