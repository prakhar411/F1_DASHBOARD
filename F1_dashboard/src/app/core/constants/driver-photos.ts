const DRIVER_IDS_WITH_PHOTOS = new Set([
  'albon', 'alonso', 'antonelli', 'arvid_lindblad', 'bearman', 'bortoleto',
  'bottas', 'colapinto', 'gasly', 'hadjar', 'hamilton', 'hulkenberg',
  'lawson', 'leclerc', 'max_verstappen', 'norris', 'ocon', 'perez',
  'piastri', 'russell', 'sainz', 'stroll',
]);

export function driverPhoto(driverId: string | null | undefined): string | null {
  if (!driverId || !DRIVER_IDS_WITH_PHOTOS.has(driverId)) {
    return null;
  }
  return `assets/drivers/${driverId}.webp`;
}
