const TEAM_IDS_WITH_CAR_IMAGES = new Set([
  'ferrari', 'mclaren', 'mercedes', 'red_bull', 'rb', 'alpine',
  'aston_martin', 'haas', 'williams', 'audi', 'cadillac',
]);

export function teamCarImage(constructorId: string | null | undefined): string | null {
  if (!constructorId || !TEAM_IDS_WITH_CAR_IMAGES.has(constructorId)) {
    return null;
  }
  return `assets/cars/${constructorId}.webp`;
}
