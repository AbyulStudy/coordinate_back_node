import proj4 from "proj4";
import { epsg4326, epsg5179 } from "./epsgProj4";

/**
 * proj4js def 정의 example
 */
proj4.defs("wgs84", epsg4326);
proj4.defs("utmk", epsg5179);
