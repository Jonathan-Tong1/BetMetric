export function americanToDecimal(odds: number): number {
    return odds > 0 ? (odds / 100) + 1 : (100 / Math.abs(odds)) + 1;
  }
  