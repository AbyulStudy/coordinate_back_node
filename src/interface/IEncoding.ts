/**
 * iconv-lite 에서 미지원 인코딩
 * @param UTF-EBCDIC
 * @param SCSU
 * @param BOCU-1
 */
export type TByteOrderMark =
  | "UTF-EBCDIC"
  | "GB-18030"
  | "UTF-32LE"
  | "UTF-32BE"
  | "UTF-8"
  | "UTF-7"
  | "UTF-1"
  | "SCSU"
  | "BOCU-1"
  | "UTF-16BE"
  | "UTF-16LE"
  | null;

export interface IEncodingByteOrderMark {
  encoding: TByteOrderMark;
  regex: RegExp;
}
