import axios from "axios";
import { logger } from "src/config/logger";
import { epsgCheerio } from "./cherrio";

/**
 *  @ref https://epsg.io/{Country,code or name of a coordinate system}
 *  @param code Country,code or name of a coordinate system
 *  @return ${title: epsg Title,code: epsgcode available in title }
 */
export const epsgio = async (code: string): Promise<String | Array<Object>> => {
  const url = "https://epsg.io/";

  try {
    const { data, request } = await axios.get(code, { baseURL: url });

    const { responseUrl } = request.res;
    const epsgCode = epsgCheerio(data);

    return [{ url: responseUrl }, ...epsgCode];
  } catch (error) {
    console.trace();
    logger.error(error);
    return [];
  }
};
