'use client'

import { SaasProvider } from '@saas-ui/react'
import * as React from 'react'

import { AudioProvider } from 'context/audio-context'
import { LanguageProvider } from 'context/language-context'
import { tracks } from 'data/songs'
import { theme } from '#theme'

export function Provider(props: { children: React.ReactNode }) {
  return (
    <SaasProvider theme={theme}>
      <LanguageProvider>
        <AudioProvider tracks={tracks}>
          {props.children}
        </AudioProvider>
      </LanguageProvider>
    </SaasProvider>
  )
}
