export const FIVE_SECONDS_MS = 5 * 1000;
export const ONE_MINUTES_MS = 60 * 1000;
export const FIVE_MINUTES_MS = 5 * 60 * 1000;
export const ONE_HOUR_MS = 60 * 60 * 1000;
export const ONE_WEEK_SEC = 7 * 24 * 60 * 60;
export const ONE_WEEK_NS = BigInt(ONE_WEEK_SEC * 1e9);

export const FEE_AMOUNT = BigInt(10_000);

export const allowedNFTStandards = [
  { id: 'EXT', name: 'EXT' },
  { id: 'ICPunks', name: 'ICPunks' }
]