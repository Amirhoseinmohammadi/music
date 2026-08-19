'use client'

import { AuthProvider } from '@saas-ui/auth'
import { SaasProvider } from '@saas-ui/react'
import * as React from 'react'

import { LanguageProvider } from 'context/language-context'
import { theme } from '#theme'

export function Provider(props: { children: React.ReactNode }) {
  return (
    <SaasProvider theme={theme}>
      <LanguageProvider>
        <AuthProvider>{props.children}</AuthProvider>
      </LanguageProvider>
    </SaasProvider>
  )
}
