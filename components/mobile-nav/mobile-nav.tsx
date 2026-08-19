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
  useUpdateEffect,
} from '@chakra-ui/react'
import * as React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiGlobe } from 'react-icons/fi'
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

  return (
    <>
      {isOpen && (
        <RemoveScroll forwardProps>
          <Flex
            direction="column"
            w="100%"
            bg="blackAlpha.950"
            h="100vh"
            overflow="auto"
            pos="fixed"
            inset="0"
            zIndex="modal"
            pb="8"
            backdropFilter="blur(10px)"
            borderBottom="1px solid"
            borderColor="whiteAlpha.200"
          >
            <Box>
              <Flex justify="space-between" align="center" px="6" pt="5" pb="5">
                <Logo onClick={onClose} />
                <HStack spacing="4">
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="gray.200"
                    leftIcon={<FiGlobe />}
                    onClick={toggleLanguage}
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {language === 'fa' ? 'EN' : 'فارسی'}
                  </Button>
                  <CloseButton ref={closeBtnRef} onClick={onClose} color="white" />
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
                      color="gray.200"
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
        icon={<AiOutlineMenu />}
        {...props}
        aria-label="Open menu"
      />
    )
  },
)

MobileNavButton.displayName = 'MobileNavButton'
