export const TEAM_COLORS: Record<string, string> = {
  red_bull: '#4a5fc0',
  ferrari: '#dc0000',
  mercedes: '#00a896',
  mclaren: '#d96a00',
  aston_martin: '#229971',
  alpine: '#b84090',
  williams: '#339ae0',
  rb: '#9b3fd1',
  audi: '#c13a52',
  cadillac: '#ad8c1f',
  haas: '#b06a38',
};

export const TEAM_COLOR_DEFAULT = '#5a5a5a';

export function teamColor(constructorId: string | null | undefined): string {
  if (!constructorId) {
    return TEAM_COLOR_DEFAULT;
  }
  return TEAM_COLORS[constructorId] ?? TEAM_COLOR_DEFAULT;
}
