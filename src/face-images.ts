/**
 * Face images configuration for Rémi UrbanHello device
 * Maps face states to their corresponding images and display names
 */

import sleepyFace from './face/face_sleepy.png';
import awakeFace from './face/face_awake.png';
import semiAwakeFace from './face/face_semi_awake.png';
import smilyFace from './face/face_smily.png';
import blankFace from './face/face_blank.png';

/**
 * French display names for each face state
 */
export const FACE_NAMES: { [key: string]: string } = {
  sleepyFace: 'Sommeil',
  awakeFace: 'Éveil',
  semiAwakeFace: 'Semi-éveil',
  smilyFace: 'Sourire',
  blankFace: 'Neutre',
};

/**
 * Mapping of face state names to their imported image assets
 */
export const FACE_ICONS: { [key: string]: string } = {
  sleepyFace,
  awakeFace,
  semiAwakeFace,
  smilyFace,
  blankFace,
};

/**
 * Get the icon URL for a given face state
 * @param faceState - The face state identifier (e.g., 'sleepyFace', 'awakeFace')
 * @returns The URL of the face icon image, defaults to blank face if state not found
 */
export function getFaceIcon(faceState: string): string {
  const primaryIcon = FACE_ICONS[faceState];
  if (primaryIcon) {
    return primaryIcon;
  }
  // Return blank face as fallback
  return FACE_ICONS.blankFace;
}
