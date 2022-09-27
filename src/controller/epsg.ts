import ApiResponse from "src/utility/apiResponse";
import { StatusCodes } from "http-status-codes";
import IController from "../interface/IController";
import ApiError from "src/utility/apiError";
import { epsgio } from "src/model/epsgio";

export default class epsgController {
  /**
   * @route http://{serverDomain}/epsg
   * @queryString `epsg` code Country,code or name of a coordinate system
   * @type `epsg` epsg number
   * @example
   * serverDomain/epsg?epsg=4019
   * @return epsgUrlResult[] | epsgDataResult[]
   * @see {@link src/interface/IEpsg.ts}
   */
  static epsg: IController = async (req, res) => {
    const { epsg }: any = req.query;
    try {
      const result = await epsgio(epsg);

      if (result[1] !== undefined) {
        ApiResponse.result(res, StatusCodes.OK, result);
      } else {
        const error = {
          code: "WRONG_CODE",
          status: StatusCodes.BAD_REQUEST,
          message: "wrong epsg code",
          url: result[0]
        };

        ApiResponse.error(res, error);
      }
    } catch (error: any) {
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };
}
