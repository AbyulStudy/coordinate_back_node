import express from "express";
import epsgController from "src/controller/epsg";
import proj4 from "src/controller/proj4";
import { coordinateFile } from "src/middleware/uploadHandler";

import indexController from "../controller/index";

const router = express.Router();

router.get("/", indexController.indexPage);

/**
 * http://{serverDomain}/proj4/coordinate?separator=""&coordinateSystemType=""
 *  */
router.get("/proj4/coordinate", coordinateFile.single("coordinateFile"), proj4.proj4Swap);

/**
 * http://{serverDomain}/epsg?epsg=""
 *  */
router.get("/epsg", epsgController.epsg);

export = router;
