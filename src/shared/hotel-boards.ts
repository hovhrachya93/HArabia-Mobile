import type { HotelRate } from "./hotels/types";

const BOARD_CODES: Record<string, string> = {
  "ROOM ONLY": "RO",
  "SELF CATERING": "SC",
  "BED AND BREAKFAST": "BB",
  "HALF BOARD": "HB",
  "FULL BOARD": "FB",
  "ALL INCLUSIVE": "AI",
};

export const boardCodeOf = (rate: HotelRate): string | undefined =>
  rate.boardCode ?? BOARD_CODES[rate.boardName.trim().toUpperCase()];

export function boardLabel(rate: HotelRate, boards: Record<string, string>): string {
  const code = boardCodeOf(rate);
  return (code && boards[code]) || rate.boardName.charAt(0) + rate.boardName.slice(1).toLowerCase();
}
