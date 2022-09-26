import { TByteOrderMark, IEncodingByteOrderMark } from "src/interface/IEncoding";

/**
 * BOM의 앞 Buffer 값에 해당하는 정규표현식입니다.
 * @example
 * const bom = coordinateFile.buffer.slice(0, 4);
 * const uInt8Array = new Uint8Array(bom);
 * const uInt8String = uInt8Array.join(" ");
 * let encodingType: any = byteOrderMarkCheck(uInt8String);
 * @return utf {@link TByteOrderMark}
 */
const encodingByteOrderMark: IEncodingByteOrderMark[] = [
  {
    encoding: "UTF-EBCDIC",
    regex: new RegExp("221 115 102 115")
  },
  {
    encoding: "GB-18030",
    regex: new RegExp("132 49 149 51")
  },
  {
    encoding: "UTF-32LE",
    regex: new RegExp("255 254 0 0")
  },
  {
    encoding: "UTF-32BE",
    regex: new RegExp("0 0 254 255")
  },
  {
    encoding: "UTF-8",
    regex: new RegExp("239 187 191")
  },
  {
    encoding: "UTF-7",
    regex: new RegExp("43 47 118")
  },
  {
    encoding: "UTF-1",
    regex: new RegExp("247 100 76")
  },
  {
    encoding: "SCSU",
    regex: new RegExp("14 254 255")
  },
  {
    encoding: "BOCU-1",
    regex: new RegExp("251 238 40")
  },
  {
    encoding: "UTF-16BE",
    regex: new RegExp("254 255")
  },
  {
    encoding: "UTF-16LE",
    regex: new RegExp("255 254")
  }
];

/**
 * Buffer 앞 4byte를 bom 값과 비교하여 bom이 존재하는 인코딩인지 확인하는 함수입니다.
 * @param {string} uInt8Start
 * @return ={@link TByteOrderMark}
 * @example
 * const coordinateFile: any = req.file;
 * const bom = coordinateFile.buffer.slice(0, 4);
 * const uInt8Array = new Uint8Array(bom);
 * const uInt8String = uInt8Array.join(" ");
 * const encodingType = byteOrderMarkCheck(uInt8String);
 * console.log(encodingType);
 */
export const byteOrderMarkCheck = (uInt8Start: string): TByteOrderMark => {
  for (const element of encodingByteOrderMark) {
    if (element.regex.test(uInt8Start)) return element.encoding;
  }
  return null;
};

export default encodingByteOrderMark;
