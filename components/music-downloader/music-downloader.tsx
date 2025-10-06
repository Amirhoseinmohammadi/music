import { Icon } from '@chakra-ui/react'
import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Section, SectionTitle, SectionTitleProps } from 'components/section'
import {
  FiDownload,
  FiHeart,
  FiPause,
  FiPlay,
  FiSkipForward,
} from 'react-icons/fi'

import * as React from 'react'

const Revealer = ({ children }: any) => children

export interface MusicProps {
  title?: string
  artist?: string
  imageUrl?: string
  downloadUrl?: string
  duration?: string
  progress?: number
  delay?: number
}

export interface MusicDownloaderListProps
  extends Omit<SectionTitleProps, 'title' | 'variant'> {
  title?: React.ReactNode
  description?: React.ReactNode
  musics: MusicProps[]
  columns?: number | number[]
  spacing?: string | number
  reveal?: React.FC<any>
}

export const MusicItem: React.FC<MusicProps> = ({
  title,
  artist,
  imageUrl,
  downloadUrl,
  duration,
  progress = 0,
}) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    const link = document.createElement('a')
    link.href = downloadUrl || '#'
    link.download = `${title || 'song'}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Stack
      direction={['column', 'row']}
      bg="#161A2B"
      rounded="2xl"
      shadow="lg"
      border="1px solid #2a2f45"
      overflow="hidden"
      spacing={4}
      align="center"
      p={4}
    >
      <Image
        src={imageUrl}
        alt={title}
        boxSize={['full', '48']}
        objectFit="cover"
        borderRadius={['2xl', 'xl']}
      />
      <VStack flex="1" align="stretch" spacing={4}>
        {/* Title + Heart */}
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Heading size="md" color="white">
              {title}
            </Heading>
            <Text fontSize="sm" color="gray.400">
              {artist}
            </Text>
          </Box>
          <Box>
            <Icon as={FiHeart} boxSize={6} color="red.400" />
          </Box>
        </Box>

        {/* Progress bar */}
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            fontSize="xs"
            color="gray.500"
          >
            <span>0:00</span>
            <span>{duration}</span>
          </Box>
          <Box
            mt={2}
            height="2"
            bg="gray.700"
            rounded="full"
            position="relative"
          >
            <Box
              height="2"
              bgGradient="linear(to-r, red.500, pink.500)"
              width={`${progress}%`}
              rounded="full"
              position="relative"
            >
              <Box
                width="4"
                height="4"
                bg="red.500"
                rounded="full"
                position="absolute"
                right={0}
                top={-1}
                shadow="lg"
              />
            </Box>
          </Box>
        </Box>

        {/* Controls */}
        <Stack direction="row" justify="space-between">
          <Icon as={FiPlay} boxSize={5} color="gray.300" />
          <Icon as={FiPause} boxSize={6} color="white" />
          <Icon as={FiSkipForward} boxSize={5} color="gray.300" />
          <Box as="button" onClick={handleDownload}>
            <Icon as={FiDownload} boxSize={5} color="gray.300" />
          </Box>
        </Stack>
      </VStack>
    </Stack>
  )
}

export const MusicDownloaderList: React.FC<MusicDownloaderListProps> = ({
  title,
  description,
  musics,
  columns = [1, 1, 2],
  spacing = 8,
  reveal: Wrap = Revealer,
  ...rest
}) => {
  return (
    <Section {...rest}>
      <VStack spacing={8} align="stretch">
        {(title || description) && (
          <Wrap>
            <SectionTitle title={title} description={description} />
          </Wrap>
        )}

        <SimpleGrid columns={columns} spacing={spacing}>
          {musics.map((music, i) => (
            <Wrap key={i} delay={music.delay}>
              <MusicItem {...music} />
            </Wrap>
          ))}
        </SimpleGrid>
      </VStack>
    </Section>
  )
}
