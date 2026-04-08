export interface Beagle {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
}

export interface Video {
  id: string;
  author: Beagle;
  videoUrl: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  music: string;
}

export interface Bark {
  id: number;
  beagleName: string;
  message: string;
  timestamp: string;
}

export const BEAGLES: Beagle[] = [
  {
    id: '1',
    name: 'Toxic Cooper',
    username: 'mutant_howler_666',
    avatar: 'https://picsum.photos/seed/mutant1/200/200?blur=2',
    bio: 'Exposed to toxic waste in the basement. Now I howl at things that aren\'t there.',
  },
  {
    id: '2',
    name: 'Zombie Daisy',
    username: 'daisy_undead_dances',
    avatar: 'https://picsum.photos/seed/mutant2/200/200?grayscale',
    bio: 'I dance for brains. Mostly for brains.',
  },
  {
    id: '3',
    name: 'Slime Barney',
    username: 'barney_the_blob',
    avatar: 'https://picsum.photos/seed/mutant3/200/200',
    bio: 'If it oozes, I eats it. If it screams, I barks at it.',
  },
];

export const VIDEOS: Video[] = [
  {
    id: 'v1',
    author: BEAGLES[0],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dog-running-on-the-grass-1135-large.mp4',
    caption: 'The toxic zoomies are mutating me! 🧪🩸 #mutant #beaglehorror',
    likes: 666,
    comments: 13,
    shares: 42,
    tags: ['mutant', 'beaglehorror', 'toxic'],
    music: 'Eerie Howls - Toxic Cooper',
  },
  {
    id: 'v2',
    author: BEAGLES[1],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dog-catching-a-ball-in-the-air-1136-large.mp4',
    caption: 'Look at my undead dance! My tail fell off! 🦴💀 #zombiebeagle #gore',
    likes: 1313,
    comments: 66,
    shares: 156,
    tags: ['zombiebeagle', 'gore', 'undead'],
    music: 'Bone Rattle - The Skeleton Beagles',
  },
  {
    id: 'v3',
    author: BEAGLES[2],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dog-resting-its-head-on-a-table-1137-large.mp4',
    caption: 'Waiting for the human to become a snack... any second now. 🧠🍴 #cannibalbeagle #hungry',
    likes: 999,
    comments: 45,
    shares: 12,
    tags: ['cannibalbeagle', 'hungry', 'brains'],
    music: 'Squelch Sounds - Slime Barney',
  },
];
