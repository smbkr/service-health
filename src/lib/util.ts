export function dateToUnix(date: Date): number {
  return Math.floor(Number(date) / 1000);
}
