'use client'

import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  IconButtonProps,
  Link,
  Stack,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useUpdateEffect,
} from '@chakra-ui/react'
import * as React from 'react'
import { IconMenu2, IconMoon, IconSun, IconWorld } from '@tabler/icons-react'
import { RemoveScroll } from 'react-remove-scroll'

import { Logo } from '#components/layout/logo'
import { useLanguage } from 'context/language-context'
import siteConfig from '#data/config'

interface MobileNavContentProps {
  isOpen?: boolean
  onClose?: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
  const { isOpen, onClose = () => {} } = props
  const closeBtnRef = React.useRef<HTMLButtonElement>(null)
  const { language, toggleLanguage } = useLanguage()
  const { colorMode, toggleColorMode } = useColorMode()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false })

  React.useEffect(() => {
    if (showOnBreakpoint === false) {
      onClose()
    }
  }, [showOnBreakpoint, onClose])

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [isOpen])

  const drawerBg = useColorModeValue('white', 'blackAlpha.950')
  const drawerBorder = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
  const btnBorder = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
  const btnColor = useColorModeValue('gray.800', 'gray.200')
  const closeBtnColor = useColorModeValue('gray.800', 'white')
  const linkColor = useColorModeValue('gray.800', 'gray.200')

  return (
    <>
      {isOpen && (
        <RemoveScroll forwardProps>
          <Flex
            direction="column"
            w="100%"
            bg={drawerBg}
            h="100vh"
            overflow="auto"
            pos="fixed"
            inset="0"
            zIndex="modal"
            pb="8"
            backdropFilter="blur(10px)"
            borderBottom="1px solid"
            borderColor={drawerBorder}
          >
            <Box>
              <Flex justify="space-between" align="center" px="6" pt="5" pb="5">
                <Logo onClick={onClose} />
                <HStack spacing="3">
                  <IconButton
                    aria-label={
                      mounted && colorMode === 'light'
                        ? 'Switch to dark theme'
                        : 'Switch to light theme'
                    }
                    title={
                      mounted && colorMode === 'light'
                        ? 'Switch to dark theme'
                        : 'Switch to light theme'
                    }
                    icon={
                      mounted && colorMode === 'light' ? (
                        <IconMoon size={16} />
                      ) : (
                        <IconSun size={16} />
                      )
                    }
                    size="sm"
                    variant="outline"
                    borderColor={btnBorder}
                    color={btnColor}
                    borderRadius="full"
                    onClick={toggleColorMode}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor={btnBorder}
                    color={btnColor}
                    leftIcon={<IconWorld size={16} />}
                    onClick={toggleLanguage}
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {language === 'fa' ? 'EN' : 'فارسی'}
                  </Button>
                  <CloseButton ref={closeBtnRef} onClick={onClose} color={closeBtnColor} />
                </HStack>
              </Flex>
              <Stack alignItems="stretch" spacing="2" px="6" pt="4">
                {siteConfig.header.links.map(({ href, id, label, labelFa }, i) => {
                  const displayLabel = language === 'fa' ? labelFa || label : label
                  return (
                    <Link
                      key={i}
                      href={href || `#${id}`}
                      onClick={onClose}
                      py={3}
                      px={4}
                      borderRadius="lg"
                      fontSize="lg"
                      fontWeight="bold"
                      color={linkColor}
                      _hover={{
                        bg: 'red.500',
                        color: 'white',
                        textDecoration: 'none',
                      }}
                    >
                      {displayLabel}
                    </Link>
                  )
                })}
              </Stack>
            </Box>
          </Flex>
        </RemoveScroll>
      )}
    </>
  )
}

export const MobileNavButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <IconButton
        ref={ref}
        display={{ base: 'flex', md: 'none' }}
        fontSize="20px"
        color="gray.200"
        variant="ghost"
        icon={<IconMenu2 />}
        {...props}
        aria-label="Open menu"
      />
    )
  },
)

MobileNavButton.displayName = 'MobileNavButton'
