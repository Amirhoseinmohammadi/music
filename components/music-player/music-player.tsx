'use client'

import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import {
  IconAlertCircle,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconVolume,
  IconVolumeOff,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import * as React from 'react'

import { useAudio } from 'context/audio-context'
import { useLanguage } from 'context/language-context'

/**
 * Format time in seconds to mm:ss format
 */
function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

const MotionBox = motion.create(Box)

export const MusicPlayer: React.FC = () => {
  const { language } = useLanguage()

  // Theme color-mode tokens
  const containerBg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(10, 10, 10, 0.95)')
  const containerBorder = useColorModeValue('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.12)')
  const containerShadow = useColorModeValue(
    '0 10px 30px rgba(0, 0, 0, 0.08)',
    '0 20px 50px rgba(0, 0, 0, 0.9)'
  )
  const textColor = useColorModeValue('gray.900', 'white')
  const secondaryTextColor = useColorModeValue('gray.500', 'gray.400')
  const iconButtonHoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const sliderTrackBg = useColorModeValue('blackAlpha.100', 'rgba(255, 255, 255, 0.15)')
  const artworkBorderColor = useColorModeValue('blackAlpha.200', 'rgba(255, 255, 255, 0.15)')
  const errorTextColor = useColorModeValue('red.700', 'red.200')
  const volumeFilledTrackBg = useColorModeValue('gray.600', 'gray.300')

  const {
    currentTrack,
    isPlaying,
    isLoading,
    error,
    currentTime,
    duration,
    progress,
    volume,
    isMuted,
    togglePlay,
    nextTrack,
    prevTrack,
    seekPercent,
    setVolume,
    toggleMute,
    setIsScrubbing,
    setScrubTime,
  } = useAudio()

  const displayTitle = currentTrack
    ? language === 'fa'
      ? currentTrack.titleFa || currentTrack.title
      : currentTrack.title
    : 'No track selected'

  const displayArtist = currentTrack?.artist || 'ALDA'
  const displayAlbum = currentTrack
    ? language === 'fa'
      ? currentTrack.albumFa || currentTrack.album
      : currentTrack.album
    : ''

  const imageSource =
    currentTrack?.imageUrl ||
    (currentTrack?.audioUrl
      ? `/api/cover?url=${encodeURIComponent(currentTrack.audioUrl)}`
      : '/static/images/alda.jpeg')

  const hasArtwork = Boolean(currentTrack?.audioUrl || currentTrack?.imageUrl)

  return (
    <MotionBox
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      w="full"
      maxW="6xl"
      mx="auto"
      bg={containerBg}
      border="1px solid"
      borderColor={containerBorder}
      borderRadius={{ base: 'xl', md: '2xl' }}
      p={{ base: 3.5, md: 4 }}
      boxShadow={containerShadow}
      backdropFilter="blur(20px)"
      overflow="hidden"
      role="region"
      aria-label="Music player"
    >
      {/* Error notification banner */}
      {error && (
        <Flex
          mb={2.5}
          p={2}
          bg="rgba(255, 30, 66, 0.12)"
          border="1px solid rgba(255, 30, 66, 0.35)"
          borderRadius="md"
          align="center"
          gap={2}
          role="alert"
        >
          <Icon as={IconAlertCircle} color="#FF1E42" boxSize={4} flexShrink={0} />
          <Text color={errorTextColor} fontSize="xs" fontFamily="mono" isTruncated>
            {error}
          </Text>
        </Flex>
      )}

      {/* =========================================================================
          DESKTOP LAYOUT (md and up):
          Artwork | Track title | Previous | Play/Pause | Next | Progress | Volume
         ========================================================================= */}
      <Flex
        display={{ base: 'none', md: 'flex' }}
        align="center"
        justify="space-between"
        gap={4}
        w="full"
      >
        {/* 1. Artwork */}
        {hasArtwork && (
          <Box
            position="relative"
            w="50px"
            h="50px"
            borderRadius="full"
            overflow="hidden"
            border="2px solid"
            borderColor={artworkBorderColor}
            flexShrink={0}
            animation={isPlaying ? 'spin 12s linear infinite' : undefined}
            sx={{
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          >
            <Image
              src={imageSource}
              alt={displayTitle}
              w="full"
              h="full"
              objectFit="cover"
              loading="lazy"
              decoding="async"
              fallbackSrc={currentTrack?.imageUrl || '/static/images/alda.jpeg'}
            />
          </Box>
        )}

        {/* 2. Track title & info */}
        <VStack align="flex-start" spacing={0.5} minW="130px" maxW="200px" flexShrink={0} overflow="hidden">
          <HStack spacing={1.5} w="full">
            <Text
              color={textColor}
              fontFamily="mono"
              fontSize="sm"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
              noOfLines={1}
              title={displayTitle}
            >
              {displayTitle}
            </Text>
            {isLoading && <Spinner size="xs" color="#FF1E42" flexShrink={0} />}
          </HStack>

          <HStack
            spacing={1.5}
            color={secondaryTextColor}
            fontSize="11px"
            fontFamily="mono"
            textTransform="uppercase"
            letterSpacing="widest"
            w="full"
          >
            <Text noOfLines={1}>{displayArtist}</Text>
            {displayAlbum && <Text noOfLines={1}>• {displayAlbum}</Text>}
          </HStack>
        </VStack>

        {/* 3, 4, 5. Controls: Previous | Play/Pause | Next */}
        <HStack spacing={1.5} flexShrink={0}>
          <Tooltip label="Previous Track" placement="top" hasArrow>
            <IconButton
              aria-label="Previous track"
              icon={<Icon as={IconPlayerSkipBack} boxSize={5} />}
              variant="ghost"
              color={secondaryTextColor}
              size="sm"
              borderRadius="full"
              _hover={{ bg: iconButtonHoverBg, color: textColor }}
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
              onClick={prevTrack}
            />
          </Tooltip>

          <Tooltip label={isPlaying ? 'Pause' : 'Play'} placement="top" hasArrow>
            <IconButton
              aria-label={isPlaying ? 'Pause track' : 'Play track'}
              icon={
                isLoading ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <Icon
                    as={isPlaying ? IconPlayerPause : IconPlayerPlay}
                    boxSize={5}
                  />
                )
              }
              bg="#FF1E42"
              color="white"
              size="md"
              borderRadius="full"
              boxShadow="0 4px 14px rgba(255, 30, 66, 0.4)"
              _hover={{ bg: '#e01637', transform: 'scale(1.05)' }}
              _active={{ transform: 'scale(0.95)' }}
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
              onClick={togglePlay}
              isDisabled={!currentTrack}
            />
          </Tooltip>

          <Tooltip label="Next Track" placement="top" hasArrow>
            <IconButton
              aria-label="Next track"
              icon={<Icon as={IconPlayerSkipForward} boxSize={5} />}
              variant="ghost"
              color={secondaryTextColor}
              size="sm"
              borderRadius="full"
              _hover={{ bg: iconButtonHoverBg, color: textColor }}
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
              onClick={nextTrack}
            />
          </Tooltip>
        </HStack>

        {/* 6. Progress: Current time | Slider | Duration */}
        <HStack spacing={2.5} flex="1" minW="150px">
          <Text
            color={secondaryTextColor}
            fontSize="11px"
            fontFamily="mono"
            w="35px"
            textAlign="right"
            flexShrink={0}
          >
            {formatTime(currentTime)}
          </Text>

          <Slider
            aria-label="Audio seek progress"
            value={progress}
            min={0}
            max={100}
            step={0.1}
            focusThumbOnChange={false}
            onChangeStart={() => setIsScrubbing(true)}
            onChange={(val) => {
              const targetTime = (val / 100) * (duration || 0)
              setScrubTime(targetTime)
            }}
            onChangeEnd={(val) => {
              seekPercent(val)
              setIsScrubbing(false)
            }}
          >
            <SliderTrack bg={sliderTrackBg} h="4px" borderRadius="full">
              <SliderFilledTrack bg="#FF1E42" />
            </SliderTrack>
            <SliderThumb
              boxSize={3}
              bg="white"
              border="2px solid #FF1E42"
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
            />
          </Slider>

          <Text
            color={secondaryTextColor}
            fontSize="11px"
            fontFamily="mono"
            w="35px"
            flexShrink={0}
          >
            {formatTime(duration || 0)}
          </Text>
        </HStack>

        {/* 7. Volume: Mute toggle + Slider */}
        <HStack spacing={2} minW="110px" maxW="140px" flexShrink={0}>
          <Tooltip label={isMuted ? 'Unmute' : 'Mute'} placement="top" hasArrow>
            <IconButton
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              icon={
                <Icon
                  as={isMuted || volume === 0 ? IconVolumeOff : IconVolume}
                  boxSize={4}
                />
              }
              variant="ghost"
              size="xs"
              color={secondaryTextColor}
              _hover={{ color: textColor, bg: iconButtonHoverBg }}
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
              onClick={toggleMute}
            />
          </Tooltip>
          <Slider
            aria-label="Volume slider"
            value={isMuted ? 0 : volume * 100}
            min={0}
            max={100}
            step={1}
            focusThumbOnChange={false}
            onChange={(val) => setVolume(val / 100)}
          >
            <SliderTrack bg={sliderTrackBg} h="3px" borderRadius="full">
              <SliderFilledTrack bg={volumeFilledTrackBg} />
            </SliderTrack>
            <SliderThumb
              boxSize={2.5}
              bg="white"
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
            />
          </Slider>
        </HStack>
      </Flex>

      {/* =========================================================================
          MOBILE LAYOUT (below md):
          Dedicated mobile structure avoiding horizontal overflow and clutter
         ========================================================================= */}
      <VStack
        display={{ base: 'flex', md: 'none' }}
        spacing={2.5}
        align="stretch"
        w="full"
      >
        {/* Top: Artwork + Title + Volume Controls */}
        <Flex align="center" justify="space-between" gap={3} w="full">
          <HStack spacing={3} minW="0" flex="1">
            {hasArtwork && (
              <Box
                position="relative"
                w="42px"
                h="42px"
                borderRadius="full"
                overflow="hidden"
                border="2px solid"
                borderColor={artworkBorderColor}
                flexShrink={0}
                animation={isPlaying ? 'spin 12s linear infinite' : undefined}
                sx={{
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              >
                <Image
                  src={imageSource}
                  alt={displayTitle}
                  w="full"
                  h="full"
                  objectFit="cover"
                  loading="lazy"
                  decoding="async"
                  fallbackSrc={currentTrack?.imageUrl || '/static/images/alda.jpeg'}
                />
              </Box>
            )}

            <VStack align="flex-start" spacing={0} minW="0" flex="1">
              <HStack spacing={1.5} w="full">
                <Text
                  color={textColor}
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  noOfLines={1}
                  title={displayTitle}
                >
                  {displayTitle}
                </Text>
                {isLoading && <Spinner size="xs" color="#FF1E42" flexShrink={0} />}
              </HStack>
              <Text
                color={secondaryTextColor}
                fontSize="10px"
                fontFamily="mono"
                textTransform="uppercase"
                letterSpacing="widest"
                noOfLines={1}
              >
                {displayArtist} {displayAlbum ? `• ${displayAlbum}` : ''}
              </Text>
            </VStack>
          </HStack>

          {/* Mute Toggle on Top Right */}
          <IconButton
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            icon={
              <Icon
                as={isMuted || volume === 0 ? IconVolumeOff : IconVolume}
                boxSize={4}
              />
            }
            variant="ghost"
            size="sm"
            borderRadius="full"
            color={secondaryTextColor}
            _hover={{ color: textColor, bg: iconButtonHoverBg }}
            _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
            onClick={toggleMute}
          />
        </Flex>

        {/* Middle: Progress Slider & Timestamps */}
        <VStack spacing={1} w="full">
          <Slider
            aria-label="Audio seek progress"
            value={progress}
            min={0}
            max={100}
            step={0.1}
            focusThumbOnChange={false}
            onChangeStart={() => setIsScrubbing(true)}
            onChange={(val) => {
              const targetTime = (val / 100) * (duration || 0)
              setScrubTime(targetTime)
            }}
            onChangeEnd={(val) => {
              seekPercent(val)
              setIsScrubbing(false)
            }}
          >
            <SliderTrack bg={sliderTrackBg} h="4px" borderRadius="full">
              <SliderFilledTrack bg="#FF1E42" />
            </SliderTrack>
            <SliderThumb
              boxSize={3.5}
              bg="white"
              border="2px solid #FF1E42"
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
            />
          </Slider>

          <Flex justify="space-between" w="full">
            <Text color={secondaryTextColor} fontSize="10px" fontFamily="mono">
              {formatTime(currentTime)}
            </Text>
            <Text color={secondaryTextColor} fontSize="10px" fontFamily="mono">
              {formatTime(duration || 0)}
            </Text>
          </Flex>
        </VStack>

        {/* Bottom: Playback Controls with Accessible Tap Targets */}
        <Flex align="center" justify="center" w="full" pt={0.5}>
          <HStack spacing={4}>
            <IconButton
              aria-label="Previous track"
              icon={<Icon as={IconPlayerSkipBack} boxSize={5} />}
              variant="ghost"
              color={secondaryTextColor}
              size="md"
              borderRadius="full"
              _hover={{ bg: iconButtonHoverBg, color: textColor }}
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
              onClick={prevTrack}
            />

            <IconButton
              aria-label={isPlaying ? 'Pause track' : 'Play track'}
              icon={
                isLoading ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <Icon
                    as={isPlaying ? IconPlayerPause : IconPlayerPlay}
                    boxSize={5}
                  />
                )
              }
              bg="#FF1E42"
              color="white"
              size="md"
              borderRadius="full"
              boxShadow="0 4px 14px rgba(255, 30, 66, 0.4)"
              _hover={{ bg: '#e01637' }}
              _active={{ transform: 'scale(0.95)' }}
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
              onClick={togglePlay}
              isDisabled={!currentTrack}
            />

            <IconButton
              aria-label="Next track"
              icon={<Icon as={IconPlayerSkipForward} boxSize={5} />}
              variant="ghost"
              color={secondaryTextColor}
              size="md"
              borderRadius="full"
              _hover={{ bg: iconButtonHoverBg, color: textColor }}
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(255, 30, 66, 0.6)' }}
              onClick={nextTrack}
            />
          </HStack>
        </Flex>
      </VStack>
    </MotionBox>
  )
}
