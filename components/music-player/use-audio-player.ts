'use client'

import * as React from 'react'

import { Track } from 'data/songs'

export interface AudioPlayerState {
  currentTrack: Track | null
  currentTrackIndex: number
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  currentTime: number
  duration: number
  progress: number // percentage 0 - 100
  volume: number // 0 - 1
  isMuted: boolean
}

export interface UseAudioPlayerOptions {
  tracks: Track[]
  initialTrackIndex?: number
  autoPlay?: boolean
}

export interface UseAudioPlayerReturn extends AudioPlayerState {
  play: () => Promise<void>
  pause: () => Promise<void>
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  selectTrack: (trackOrIndex: Track | number) => void
  seek: (timeInSeconds: number) => void
  seekPercent: (percentage: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  isScrubbing: boolean
  setIsScrubbing: (scrubbing: boolean) => void
  scrubTime: number
  setScrubTime: (time: number) => void
}

/**
 * Custom hook to manage HTML5 Audio playback with a single audio instance,
 * handling play/pause, seeking, track navigation, loading state, error handling,
 * and automatic track progression.
 */
export function useAudioPlayer({
  tracks,
  initialTrackIndex = 0,
  autoPlay = false,
}: UseAudioPlayerOptions): UseAudioPlayerReturn {
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState<number>(
    tracks.length > 0 && initialTrackIndex >= 0 && initialTrackIndex < tracks.length
      ? initialTrackIndex
      : 0
  )
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const [currentTime, setCurrentTime] = React.useState<number>(0)
  const [duration, setDuration] = React.useState<number>(0)
  const [volume, setVolumeState] = React.useState<number>(1)
  const [isMuted, setIsMuted] = React.useState<boolean>(false)
  const [isScrubbing, setIsScrubbing] = React.useState<boolean>(false)
  const [scrubTime, setScrubTime] = React.useState<number>(0)

  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const playPromiseRef = React.useRef<Promise<void> | null>(null)
  const tracksRef = React.useRef<Track[]>(tracks)
  tracksRef.current = tracks

  const isScrubbingRef = React.useRef<boolean>(isScrubbing)
  isScrubbingRef.current = isScrubbing

  const currentTrackIndexRef = React.useRef<number>(currentTrackIndex)
  currentTrackIndexRef.current = currentTrackIndex

  const volumeRef = React.useRef<number>(volume)
  volumeRef.current = volume

  const isMutedRef = React.useRef<boolean>(isMuted)
  isMutedRef.current = isMuted

  const currentTrack: Track | null = tracks[currentTrackIndex] || null

  // Initialize single Audio instance on client
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const audio = new Audio()
    audio.preload = 'metadata'
    audio.volume = volumeRef.current
    audio.muted = isMutedRef.current
    audioRef.current = audio

    const handleTimeUpdate = () => {
      if (!isScrubbingRef.current) {
        setCurrentTime(audio.currentTime)
      }
    }

    const handleLoadedMetadata = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration)
      }
      setIsLoading(false)
      setError(null)
    }

    const handleDurationChange = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration)
      }
    }

    const handleWaiting = () => {
      setIsLoading(true)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handlePlaying = () => {
      setIsLoading(false)
      setIsPlaying(true)
      setError(null)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      // Automatic next track on ended (loops smoothly)
      if (tracksRef.current.length > 0) {
        const nextIdx = (currentTrackIndexRef.current + 1) % tracksRef.current.length
        setCurrentTrackIndex(nextIdx)
      }
    }

    const handleError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      const mediaError = audio.error
      let errorMsg = 'Failed to load audio'
      if (mediaError) {
        switch (mediaError.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMsg = 'Audio playback aborted'
            break
          case MediaError.MEDIA_ERR_NETWORK:
            errorMsg = 'Network error while loading audio'
            break
          case MediaError.MEDIA_ERR_DECODE:
            errorMsg = 'Audio decoding error'
            break
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMsg = 'Audio format not supported or file not found'
            break
          default:
            errorMsg = mediaError.message || 'Unknown audio error'
        }
      }
      setError(errorMsg)
    }

    // Attach all event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('playing', handlePlaying)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('waiting', handleWaiting)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('playing', handlePlaying)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  // Sync audio source when current track changes
  const isInitialMount = React.useRef<boolean>(true)

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    setError(null)
    setCurrentTime(0)
    setDuration(0)

    // Reapply persistent volume and mute state
    audio.volume = volumeRef.current
    audio.muted = isMutedRef.current

    if (currentTrack.audioUrl) {
      setIsLoading(true)
      audio.src = currentTrack.audioUrl
      audio.load()

      // Auto play when track changes (except on initial mount unless autoPlay is true)
      if (!isInitialMount.current || autoPlay) {
        playPromiseRef.current = audio.play().catch((err: unknown) => {
          if (err instanceof Error && err.name !== 'AbortError') {
            setError('Playback prevented: user gesture required or source unavailable')
          }
          setIsPlaying(false)
          setIsLoading(false)
        })
      }
    } else {
      setError('No audio source provided for this track')
      setIsLoading(false)
      setIsPlaying(false)
    }

    isInitialMount.current = false
  }, [currentTrackIndex, currentTrack, autoPlay])

  // Play handler
  const play = React.useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !currentTrack?.audioUrl) return

    setError(null)
    try {
      setIsLoading(true)
      playPromiseRef.current = audio.play()
      await playPromiseRef.current
      setIsPlaying(true)
      setIsLoading(false)
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError('Playback prevented or file unavailable')
      }
      setIsPlaying(false)
      setIsLoading(false)
    }
  }, [currentTrack])

  // Pause handler with pending promise guard
  const pause = React.useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current
      } catch {
        // Safe to ignore AbortError
      }
    }

    audio.pause()
    setIsPlaying(false)
  }, [])

  // Toggle Play / Pause
  const togglePlay = React.useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, pause, play])

  // Next Track with edge cases
  const nextTrack = React.useCallback(() => {
    if (tracks.length <= 1) {
      const audio = audioRef.current
      if (audio) {
        audio.currentTime = 0
        setCurrentTime(0)
      }
      return
    }
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
  }, [tracks.length])

  // Previous Track with edge cases
  const prevTrack = React.useCallback(() => {
    const audio = audioRef.current
    if (tracks.length <= 1) {
      if (audio) {
        audio.currentTime = 0
        setCurrentTime(0)
      }
      return
    }

    // If more than 3 seconds into track, restart track first
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      setCurrentTime(0)
      return
    }

    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
  }, [tracks.length])

  // Select Track by object or index
  const selectTrack = React.useCallback(
    (trackOrIndex: Track | number) => {
      let targetIndex: number
      if (typeof trackOrIndex === 'number') {
        targetIndex = trackOrIndex
      } else {
        targetIndex = tracks.findIndex((t) => t.id === trackOrIndex.id)
      }

      if (targetIndex >= 0 && targetIndex < tracks.length) {
        if (targetIndex === currentTrackIndexRef.current) {
          togglePlay()
        } else {
          setCurrentTrackIndex(targetIndex)
        }
      }
    },
    [tracks, togglePlay]
  )

  // Seek to absolute time in seconds with sanity checks
  const seek = React.useCallback((timeInSeconds: number) => {
    const audio = audioRef.current
    if (!audio) return

    const maxDur = audio.duration || duration || 0
    const clampedTime = Math.max(0, Math.min(timeInSeconds, maxDur))
    if (isFinite(clampedTime)) {
      try {
        audio.currentTime = clampedTime
      } catch {
        // Safe fallback for uninitialized audio buffer
      }
      setCurrentTime(clampedTime)
    }
  }, [duration])

  // Seek by percentage (0 - 100)
  const seekPercent = React.useCallback(
    (percentage: number) => {
      const audio = audioRef.current
      const dur = audio?.duration || duration || 0
      if (dur <= 0) return

      const targetTime = (Math.max(0, Math.min(percentage, 100)) / 100) * dur
      seek(targetTime)
    },
    [duration, seek]
  )

  // Volume control with persistence
  const setVolume = React.useCallback((newVolume: number) => {
    const audio = audioRef.current
    const clamped = Math.max(0, Math.min(1, newVolume))
    setVolumeState(clamped)
    if (audio) {
      audio.volume = clamped
      if (clamped === 0) {
        audio.muted = true
        setIsMuted(true)
      } else if (audio.muted) {
        audio.muted = false
        setIsMuted(false)
      }
    }
  }, [])

  // Toggle Mute
  const toggleMute = React.useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.muted = false
      setIsMuted(false)
      if (volume === 0) {
        setVolume(0.5)
      }
    } else {
      audio.muted = true
      setIsMuted(true)
    }
  }, [isMuted, volume, setVolume])

  // Calculate progress percentage
  const effectiveTime = isScrubbing ? scrubTime : currentTime
  const progress = duration > 0 ? (effectiveTime / duration) * 100 : 0

  return {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    isLoading,
    error,
    currentTime: effectiveTime,
    duration,
    progress,
    volume,
    isMuted,
    play,
    pause,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    seek,
    seekPercent,
    setVolume,
    toggleMute,
    isScrubbing,
    setIsScrubbing,
    scrubTime,
    setScrubTime,
  }
}
