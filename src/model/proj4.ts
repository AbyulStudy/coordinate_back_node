import proj4 from "proj4";
import { proj4HandlerQuery } from "src/interface/IProj4";

/**
 * utmk 혹은 wgs84로 되어 있는 위도경도 값을 스왑시켜주는 함수입니다.
 * @param line 주소,경도(longitude),위도(latitude) 순으로 작성되어 있는 string 값입니다.
 * @param query {@link proj4HandlerQuery}
 * @param separator 구분자 {@link separator}
 * @param coordinateSystemType 현재 좌표계 타입 {@link coordinateSystemType}
 * @example
 * const line = "세종특별자치시 한누리대로 1821,983203.451598,1833323.334451";
 * const query = { separator: ",", coordinateSystemType: "utmk" };
 *
 * // 세종특별자치시 한누리대로 1821,36.49742094176391,127.31245119737163
 * utmkWgs84Swap(line,query)
 * @returns `${address},${longitudeX},${latitudeY}`
 */

export const utmkWgs84Swap = (line: string, query: proj4HandlerQuery) => {
  const { separator, coordinateSystemType } = query;
  const lineArr = line.split(separator);
  const address = lineArr[0];
  let longitudeX = Number(lineArr[1]);
  let latitudeY = Number(lineArr[2]);
  const coordinate = [longitudeX, latitudeY];

  let proj4Result;
  if (coordinateSystemType === "wgs84") {
    proj4Result = proj4("wgs84", "utmk", coordinate);
  } else {
    proj4Result = proj4("utmk", "wgs84", coordinate);
  }

  longitudeX = proj4Result[1];
  latitudeY = proj4Result[0];

  return `${address},${longitudeX},${latitudeY}`;
};
