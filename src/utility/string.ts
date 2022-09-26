import { EOL } from "os";

/**
 * node 자체 module인 os 에서 {@link EOL} 메소드를 사용한 함수입니다.
 * @description
 * LF(\n)갯수가 많은 경우 \n 을 반환합니다.
 * CRLF(\r\n)갯수가 많은 경우 \r\n 을 반환합니다.
 * LF(\n) 과 CRLF(\r\n) 갯수가 같은 경우는 개행문자가 없는 경우이기에 현재 OS에 맞는 EOL을 반환합니다.
 * @requires os
 * @param content : string으로 이루어진 문자열입니다.
 * @example
 * const str = "안녕하세요\r\n테스트 문자열\r\n입니다.";
 * const eol = getEOL(str); // return "\r\n"
 * const strArr = str.split(eol);
 * @returns "\n" : "\r\n"
 */
export const getEOL = (content: string) => {
  const eolRegx = /\r\n|\n/g;
  const eolMatchArr: any = content.match(eolRegx);

  const numberOfLF = eolMatchArr && eolMatchArr.filter((eol: string) => eol === "\n").length;
  const numberOfCRLF = eolMatchArr && eolMatchArr.length - numberOfLF;

  if (numberOfLF === numberOfCRLF) {
    return EOL; // use the OS default
  }

  return numberOfLF > numberOfCRLF ? "\n" : "\r\n";
};
