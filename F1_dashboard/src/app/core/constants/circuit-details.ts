export interface CircuitDetail {
  lengthKm: number;
  corners: number;
  /** Race laps, per the FIA rule of racing to the lap that reaches (or just
   *  exceeds) 305km — 260km for Monaco specifically. */
  laps: number;
  /** DRS was retired for 2026 (replaced by Active Aerodynamics / Overtake Mode).
   *  Zone counts below are the last confirmed figures from the 2025 season,
   *  kept as a reference stat rather than an official 2026 figure. */
  drsZones2025: number | null;
}

export const CIRCUIT_DETAILS: Record<string, CircuitDetail> = {
  albert_park: { lengthKm: 5.278, corners: 14, laps: 58, drsZones2025: 4 },
  shanghai: { lengthKm: 5.451, corners: 16, laps: 56, drsZones2025: 2 },
  suzuka: { lengthKm: 5.807, corners: 18, laps: 53, drsZones2025: 1 },
  miami: { lengthKm: 5.412, corners: 19, laps: 57, drsZones2025: 3 },
  villeneuve: { lengthKm: 4.361, corners: 14, laps: 70, drsZones2025: 3 },
  monaco: { lengthKm: 3.337, corners: 19, laps: 78, drsZones2025: 1 },
  catalunya: { lengthKm: 4.657, corners: 14, laps: 66, drsZones2025: 2 },
  red_bull_ring: { lengthKm: 4.318, corners: 10, laps: 71, drsZones2025: 3 },
  silverstone: { lengthKm: 5.891, corners: 18, laps: 52, drsZones2025: 2 },
  spa: { lengthKm: 7.004, corners: 19, laps: 44, drsZones2025: 2 },
  hungaroring: { lengthKm: 4.381, corners: 14, laps: 70, drsZones2025: 2 },
  zandvoort: { lengthKm: 4.259, corners: 14, laps: 72, drsZones2025: 2 },
  monza: { lengthKm: 5.793, corners: 11, laps: 53, drsZones2025: 2 },
  madring: { lengthKm: 5.476, corners: 21, laps: 56, drsZones2025: null },
  baku: { lengthKm: 6.003, corners: 20, laps: 51, drsZones2025: 2 },
  marina_bay: { lengthKm: 4.940, corners: 19, laps: 62, drsZones2025: 4 },
  americas: { lengthKm: 5.513, corners: 20, laps: 56, drsZones2025: 2 },
  rodriguez: { lengthKm: 4.304, corners: 17, laps: 71, drsZones2025: 3 },
  interlagos: { lengthKm: 4.309, corners: 15, laps: 71, drsZones2025: 2 },
  vegas: { lengthKm: 6.201, corners: 17, laps: 50, drsZones2025: 2 },
  losail: { lengthKm: 5.419, corners: 16, laps: 57, drsZones2025: 3 },
  yas_marina: { lengthKm: 5.281, corners: 16, laps: 58, drsZones2025: 2 },
};

export function circuitDetail(circuitId: string | null | undefined): CircuitDetail | null {
  if (!circuitId) {
    return null;
  }
  return CIRCUIT_DETAILS[circuitId] ?? null;
}
