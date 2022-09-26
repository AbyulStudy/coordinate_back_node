import iconv from "iconv-lite";
import proj4 from "proj4";
import { StatusCodes } from "http-status-codes";
import ApiResponse from "src/utility/apiResponse";
import ApiError from "src/utility/apiError";
import IController from "../interface/IController";
import { utmkWgs84Swap } from "src/model/proj4";
import { epsg4326, epsg5179 } from "src/utility/epsgProj4";
import { byteOrderMarkCheck } from "src/utility/encodingByteOrderMark";
import { checkUTF, encodingRegx } from "src/utility/encodingRegex";
import { getEOL } from "src/utility/string";

export default class proj4Controller {
  /**
   * @route http://{serverDomain}/proj4/coordinate
   * @inputFileExtension txt,csv
   * @inputFileExample
   * 주소,utmk_X,utmk_Y
   * @param file
   * @type File
   * @param separator 구분자 - [ , ] or [ | ]
   * @param coordinateSystemType 좌표계 타입 - wgs84 | utmk
   * @type queryString
   * @example - inputFile Example separtor = [ | ]
   * 주소 | utmkX | utmkY
   * 주소.. | 123 | 123
   * 주소.. | 123 | 123
   * @return csvFile
   * @returnEncoding utf-8
   */
  static proj4Swap: IController = async (req, res) => {
    const coordinateFile: any = req.file;
    const { separator, coordinateSystemType }: any = req.query;
    try {
      // throw Error Handler
      if (!coordinateFile) {
        throw new ApiError("FILE_UNDEFINED", StatusCodes.BAD_REQUEST, "Please check the file.");
      }
      if (!separator || !coordinateSystemType) {
        throw new ApiError("QS_UNDEFINED", StatusCodes.BAD_REQUEST, "Please check the queryString.");
      }

      // get Encoding Type
      const bom = coordinateFile.buffer.slice(0, 4);
      const uInt8Array = new Uint8Array(bom);
      const uInt8String = uInt8Array.join(" ");
      let encodingType: any = byteOrderMarkCheck(uInt8String);

      if (!encodingType) {
        const utfContent = Buffer.from(coordinateFile?.buffer).toString("utf-8");
        const utf8 = checkUTF(utfContent);

        if (utf8) {
          encodingType = "UTF-8";
        }

        if (!utf8) {
          const crlf = getEOL(utfContent);
          const textArr = utfContent.split(crlf);

          for (const line of textArr) {
            encodingRegx.map(item => {
              if (item.isoRegex.test(line)) {
                encodingType = item.encoding;
                return true;
              }
            });
            if (encodingType) {
              break;
            }
          }
        }
      }

      const decodingContent = iconv.decode(coordinateFile?.buffer, encodingType);
      const crlf = getEOL(decodingContent);
      proj4.defs("wgs84", epsg4326);
      proj4.defs("utmk", epsg5179);

      const contentArr = decodingContent.split(crlf);
      const resultArr: string[] = [];
      contentArr.map((line, index) => {
        try {
          const lineStr = utmkWgs84Swap(line, { separator, coordinateSystemType });
          resultArr.push(lineStr);
        } catch (error) {
          throw new ApiError("INVALID_DATA", StatusCodes.BAD_REQUEST, `Line ${index} is incorrect data.`);
        }
      });

      ApiResponse.result(res, 200, resultArr);
    } catch (error) {
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };
}
