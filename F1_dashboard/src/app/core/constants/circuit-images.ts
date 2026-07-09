const CIRCUIT_IDS_WITH_IMAGES = new Set([
  'albert_park', 'shanghai', 'suzuka', 'miami', 'villeneuve', 'monaco',
  'catalunya', 'red_bull_ring', 'silverstone', 'spa', 'hungaroring',
  'zandvoort', 'monza', 'baku', 'marina_bay', 'americas', 'rodriguez',
  'interlagos', 'vegas', 'losail', 'yas_marina',
]);

export function circuitImage(circuitId: string | null | undefined): string | null {
  if (!circuitId || !CIRCUIT_IDS_WITH_IMAGES.has(circuitId)) {
    return null;
  }
  return `assets/circuits/${circuitId}.png`;
}
