// Jolpica's API returns simplified constructor names (e.g. "Audi"); this overrides
// them with each team's real current official entry name (e.g. "Audi Revolut F1 Team"),
// per the 2026 season entry list.
export const TEAM_DISPLAY_NAMES: Record<string, string> = {
  ferrari: 'Scuderia Ferrari HP',
  mercedes: 'Mercedes-AMG Petronas F1 Team',
  mclaren: 'McLaren Mastercard F1 Team',
  red_bull: 'Oracle Red Bull Racing',
  rb: 'Visa Cash App Racing Bulls F1 Team',
  alpine: 'BWT Alpine F1 Team',
  aston_martin: 'Aston Martin Aramco F1 Team',
  haas: 'TGR Haas F1 Team',
  williams: 'Atlassian Williams F1 Team',
  audi: 'Audi Revolut F1 Team',
  cadillac: 'Cadillac Formula 1 Team',
};

export function teamDisplayName(constructorId: string | null | undefined, fallback: string): string {
  if (!constructorId) {
    return fallback;
  }
  return TEAM_DISPLAY_NAMES[constructorId] ?? fallback;
}
