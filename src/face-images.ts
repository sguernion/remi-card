// Face images configuration
// Images can be loaded from the card's assets directory or fallback to /local/remi/

export const FACE_NAMES: { [key: string]: string } = {
  sleepyFace: 'Sommeil',
  awakeFace: 'Éveil',
  semiAwakeFace: 'Semi-éveil',
  smilyFace: 'Sourire',
  blankFace: 'Neutre',
};

// Get the base path for the card (where remi-card.js is loaded from)
function getCardBasePath(): string {
  // Try to get the script path from the current script
  const scripts = document.getElementsByTagName('script');
  for (let i = scripts.length - 1; i >= 0; i--) {
    const src = scripts[i].src;
    if (src && src.includes('remi-card.js')) {
      return src.substring(0, src.lastIndexOf('/'));
    }
  }

  // Fallback to standard path
  return '/local/community/remi-card';
}

// Primary path: Card's assets directory
const CARD_BASE_PATH = getCardBasePath();

export const FACE_ICONS: { [key: string]: string } = {
  sleepyFace: `${CARD_BASE_PATH}/assets/face_sleepy.png`,
  awakeFace: `${CARD_BASE_PATH}/assets/face_awake.png`,
  semiAwakeFace: `${CARD_BASE_PATH}/assets/face_semi_awake.png`,
  smilyFace: `${CARD_BASE_PATH}/assets/face_smily.png`,
  blankFace: `${CARD_BASE_PATH}/assets/face_blank.png`,
};


// Helper to get face icon with fallback
export function getFaceIcon(faceState: string): string {
  const primaryIcon = FACE_ICONS[faceState];
  if (primaryIcon) {
    return primaryIcon;
  }
  // Return blank face
  return FACE_ICONS.blankFace;
}
