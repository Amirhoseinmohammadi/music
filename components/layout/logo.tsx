import { Box, HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import * as React from 'react'

export interface LogoProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const Logo: React.FC<LogoProps> = ({ href = '#hero', onClick }) => {
  return (
    <Box as={Link} href={href} onClick={onClick} textDecoration="none" _hover={{ textDecoration: 'none' }}>
      <HStack spacing={2} align="center">
        <Box
          bgGradient="linear(to-br, red.500, red.800)"
          px={2.5}
          py={1}
          borderRadius="md"
          boxShadow="0 0 15px rgba(229, 62, 62, 0.4)"
        >
          <Text fontWeight="900" fontSize="lg" letterSpacing="widest" color="white" lineHeight="1">
            ALDA
          </Text>
        </Box>
        <Text
          fontWeight="bold"
          fontSize="xs"
          letterSpacing="wider"
          color="gray.400"
          display={{ base: 'none', sm: 'inline' }}
          textTransform="uppercase"
        >
          Official
        </Text>
      </HStack>
    </Box>
  )
}
