import { extendTheme, type StyleFunctionProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import '@fontsource-variable/inter'
import { theme as baseTheme } from '@saas-ui/react'

import components from './components'
import { fontSizes } from './foundations/typography'

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    colors: {
      primary: {
        50: '#ffe4e6',
        100: '#fecdd3',
        200: '#fda4af',
        300: '#fb7185',
        400: '#f43f5e',
        500: '#FF1E42',
        600: '#e01637',
        700: '#b8122d',
        800: '#8c0e22',
        900: '#5c0916',
      },
      brand: {
        red: '#FF1E42',
        darkRed: '#7A0A1C',
        surfaceDark: '#080B10',
        surfaceLight: '#F8F9FA',
        cardDark: '#0E121E',
        cardLight: '#FFFFFF',
        borderDark: 'rgba(255, 30, 66, 0.25)',
        borderLight: 'rgba(255, 30, 66, 0.2)',
      },
    },
    styles: {
      global: (props: StyleFunctionProps) => ({
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          color: '#F0F2F5',
          bg: '#000000',
          fontSize: 'lg',
          overflowX: 'hidden',
        },
      }),
    },
    fonts: {
      heading: 'Inter Variable, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Vazirmatn, sans-serif',
      body: 'Inter Variable, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Vazirmatn, sans-serif',
    },
    fontSizes,
    components,
  },
  baseTheme,
)
