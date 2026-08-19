import { IconButton, useColorMode } from '@chakra-ui/react'
import { IconMoon, IconSun } from '@tabler/icons-react'

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      variant="ghost"
      aria-label="theme toggle"
      icon={colorMode === 'light' ? <IconMoon size={14} /> : <IconSun size={14} />}
      borderRadius="md"
      onClick={toggleColorMode}
    />
  )
}

export default ThemeToggle
