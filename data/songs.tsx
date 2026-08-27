export interface Track {
  id: string
  title: string
  titleFa: string
  artist: string
  album?: string
  albumFa?: string
  releaseDate?: string
  imageUrl: string
  audioUrl: string
  driveDownloadUrl?: string
  duration?: string
}

/**
 * Google Drive Direct Download URL Format:
 * 1. Standard Share/View URL: https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing
 * 2. Direct Download Link:    https://drive.google.com/uc?export=download&id={FILE_ID}
 */
export const formatGoogleDriveDirectUrl = (input: string): string => {
  if (!input) return '#'
  if (input.startsWith('/') || input.startsWith('#')) return input
  const match = input.match(/\/d\/([a-zA-Z0-9_-]+)/) || input.match(/id=([a-zA-Z0-9_-]+)/)
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`
  }
  return input
}

export const tracks: Track[] = [
  {
    id: '1',
    title: 'Gangam Pore',
    titleFa: 'گنگم پره',
    artist: 'ALDA',
    album: 'Single',
    albumFa: 'تک‌آهنگ',
    releaseDate: '2024',
    imageUrl: '/static/images/cover1.jpg',
    audioUrl: '/static/music/Alda - Gangam Pore.mp3',
    driveDownloadUrl: '/static/music/Alda - Gangam Pore.mp3',
    duration: '3:55',
  },
  {
    id: '2',
    title: 'Namak Nadare',
    titleFa: 'نمک نداره',
    artist: 'ALDA',
    album: 'Single',
    albumFa: 'تک‌آهنگ',
    releaseDate: '2024',
    imageUrl: '/static/images/cover2.jpg',
    audioUrl: '/static/music/Alda - Namak Nadare.mp3',
    driveDownloadUrl: '/static/music/Alda - Namak Nadare.mp3',
    duration: '4:20',
  },
  {
    id: '3',
    title: 'Sare Shab',
    titleFa: 'سر شب',
    artist: 'ALDA',
    album: 'Single',
    albumFa: 'تک‌آهنگ',
    releaseDate: '2024',
    imageUrl: '/static/images/cover3.jpg',
    audioUrl: '/static/music/Alda - Sare Shab.mp3',
    driveDownloadUrl: '/static/music/Alda - Sare Shab.mp3',
    duration: '3:40',
  },
  {
    id: '4',
    title: 'Tanhayi',
    titleFa: 'تنهایی',
    artist: 'ALDA',
    album: 'Single',
    albumFa: 'تک‌آهنگ',
    releaseDate: '2024',
    imageUrl: '/static/images/cover4.jpg',
    audioUrl: '/static/music/Alda-Tanhayi.mp3',
    driveDownloadUrl: '/static/music/Alda-Tanhayi.mp3',
    duration: '3:50',
  },
  {
    id: '5',
    title: 'Gham Angize (Prod. Ashkanmadz)',
    titleFa: 'غم انگیزه',
    artist: 'ALDA',
    album: 'Single',
    albumFa: 'تک‌آهنگ',
    releaseDate: '2024',
    imageUrl: '/static/images/cover5.jpg',
    audioUrl: '/static/music/Gham Angize (Prod Ashkanmadz).mp3',
    driveDownloadUrl: '/static/music/Gham Angize (Prod Ashkanmadz).mp3',
    duration: '2:26',
  },
  {
    id: '6',
    title: 'Mordam Dige (Prod. Ashkanmadz)',
    titleFa: 'مردم دیگه',
    artist: 'ALDA',
    album: 'Single',
    albumFa: 'تک‌آهنگ',
    releaseDate: '2024',
    imageUrl: '/static/images/cover6.jpg',
    audioUrl: '/static/music/Mordam Dige (Prod Ashkanmadz).mp3',
    driveDownloadUrl: '/static/music/Mordam Dige (Prod Ashkanmadz).mp3',
    duration: '2:15',
  },
  {
    id: '7',
    title: 'Bad Nabe',
    titleFa: 'بد نبین',
    artist: 'ALDA',
    album: 'Single',
    albumFa: 'تک‌آهنگ',
    releaseDate: '2024',
    imageUrl: '/static/images/cover7.jpg',
    audioUrl: '/static/music/bad nabe.mp3',
    driveDownloadUrl: '/static/music/bad nabe.mp3',
    duration: '4:08',
  },
  {
    id: '8',
    title: 'Dark Mode',
    titleFa: 'دارک مود',
    artist: 'ALDA',
    album: 'Single',
    albumFa: 'تک‌آهنگ',
    releaseDate: '2024',
    imageUrl: '/static/images/cover8.jpg',
    audioUrl: '/static/music/dark mode.mp3',
    driveDownloadUrl: '/static/music/dark mode.mp3',
    duration: '3:22',
  },
  {
    id: '9',
    title: 'Level Up',
    titleFa: 'لول‌آپ',
    artist: 'ALDA',
    album: 'Single',
    albumFa: 'تک‌آهنگ',
    releaseDate: '2024',
    imageUrl: '/static/images/cover9.jpg',
    audioUrl: '/static/music/lEVEL UP.mp3',
    driveDownloadUrl: '/static/music/lEVEL UP.mp3',
    duration: '3:43',
  },
]

export const musics = tracks
