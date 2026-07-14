export const TEAM_LOGOS: Record<string, string> = {
  ferrari: 'assets/teams/ferrari.png',
  mclaren: 'assets/teams/mclaren.svg',
  mercedes: 'assets/teams/mercedes.svg',
  aston_martin: 'assets/teams/aston_martin.png',
  alpine: 'assets/teams/alpine.png',
  williams: 'assets/teams/williams.svg',
  red_bull: 'assets/teams/red_bull.png',
  haas: 'assets/teams/haas.png',
  audi: 'assets/teams/audi.png',
  cadillac: 'assets/teams/cadillac.png',
  rb: 'assets/teams/rb.png',
};

export function teamLogo(constructorId: string | null | undefined): string | null {
  if (!constructorId) {
    return null;
  }
  return TEAM_LOGOS[constructorId] ?? null;
}
