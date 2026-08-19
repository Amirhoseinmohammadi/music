import {
  VStack,
  Heading,
  Box,
  StackProps,
  useMultiStyleConfig,
} from '@chakra-ui/react'

export interface SectionTitleProps extends Omit<StackProps, 'title'> {
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center' | 'right'
  variant?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  const { title, description, align = 'left', variant, ...rest } = props
  const styles = useMultiStyleConfig('SectionTitle', { variant })

  const alignItems = align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'

  return (
    <VStack
      sx={styles.wrapper}
      alignItems={alignItems}
      spacing={4}
      {...rest}
    >
      <Heading sx={styles.title} as="h2">
        {title}
      </Heading>
      {description && (
        <Box sx={styles.description} textAlign={align}>
          {description}
        </Box>
      )}
    </VStack>
  )
}
