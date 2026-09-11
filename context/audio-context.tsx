'use client'

import * as React from 'react'

import { useAudioPlayer, UseAudioPlayerReturn } from 'components/music-player/use-audio-player'
import { tracks as defaultTracks, Track } from 'data/songs'

export type AudioContextValue = UseAudioPlayerReturn

const AudioContext = React.createContext<AudioContextValue | undefined>(undefined)

export interface AudioProviderProps {
  children: React.ReactNode
  tracks?: Track[]
  initialTrackIndex?: number
  autoPlay?: boolean
}

export const AudioProvider: React.FC<AudioProviderProps> = ({
  children,
  tracks = defaultTracks,
  initialTrackIndex = 0,
  autoPlay = false,
}) => {
  const audioState = useAudioPlayer({
    tracks,
    initialTrackIndex,
    autoPlay,
  })

  return (
    <AudioContext.Provider value={audioState}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = (): AudioContextValue => {
  const context = React.useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
