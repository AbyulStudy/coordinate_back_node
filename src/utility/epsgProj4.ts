/**
 *  @ref https://sgis.kostat.go.kr/developer/html/openApi/api/dataCode/CoordCode.html
 *  @ref https://www.osgeo.kr/17
 */
export let epsgRef: any;

/** [전지구 좌표계]전세계를 한번에 나타내야 할 때 많이 쓰이는 좌표계들입니다.
 *  @readonly
 *  @coordinateSystem WGS84
 *  @description GPS가 사용하는 좌표계
 *  @epsg EPSG:4326, EPSG:4166 (Korean 1995)
 *  */
export const epsg4326: string = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ";

/** [전지구 좌표계]전세계를 한번에 나타내야 할 때 많이 쓰이는 좌표계들입니다.
 *  @readonly
 *  @coordinateSystem Bessel 1841
 *  @description 한국과 일본에 잘 맞는 지역타원체를 사용한
 *  @epsg 좌표계EPSG:4004, EPSG:4162 (Korean 1985)
 *  */
export const epsg4004: string =
  "+proj=longlat +ellps=bessel +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";

/** [전지구 좌표계]전세계를 한번에 나타내야 할 때 많이 쓰이는 좌표계들입니다.
 *  @readonly
 *  @coordinateSystem GRS80
 *  @description WGS84와 거의 유사
 *  @epsg EPSG:4019, EPSG:4737 (Korean 2000)
 *  */
export const epsg4019: string = "+proj=longlat +ellps=GRS80 +no_defs";

/** [전지구 좌표계]전세계를 한번에 나타내야 할 때 많이 쓰이는 좌표계들입니다.
 *  @readonly
 *  @coordinateSystem Google Mercator
 *  @description 구글지도/빙지도/야후지도/OSM 등 에서 사용중인 좌표계
 *  @epsg EPSG:3857(공식), EPSG:900913(통칭)
 *  */
export const epsg3857: string =
  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";

/**
 *  @readonly
 *  @coordinateSystem UTM-K(Bessel)
 *  @description 새주소지도에서 사용 중(구)
 *  @epsg EPSG:5178
 *  */
export const epsg5178: string =
  "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43";

/**
 *  @readonly
 *  @coordinateSystem UTM-K(GRS80)
 *  @description 네이버(v3) 와 도로명주소 DB에서 사용하는 좌표계
 *  @epsg EPSG:5179
 *  */
export const epsg5179: string =
  "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs";

/**
 *  @readonly
 *  @coordinateSystem UTM-K(GRS80)
 *  @description 카카오 맵에서 사용, GRS80 타원체의 한국 중부원점이며 Y 축으로 500000미터만큼 이동시킨 좌표계.
 *  @epsg EPSG:5181
 *  */
export const epsg5181: string =
  "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs";

/** [현재 국토지리정보원 표준]2002년 이후에 국토지리정보원 지형도에서 사용중인 좌표계입니다.
 *  @readonly
 *  @coordinateSystem 서부원점(GRS80)-falseY:60000
 *  @epsg EPSG:5185
 *  */
export const epsg5185: string =
  "+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
/** [현재 국토지리정보원 표준]2002년 이후에 국토지리정보원 지형도에서 사용중인 좌표계입니다.
 *  @readonly
 *  @coordinateSystem 중부원점(GRS80)-falseY:60000
 *  @epsg EPSG:5186
 *  */
export const epsg5186: string =
  "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
/** [현재 국토지리정보원 표준]2002년 이후에 국토지리정보원 지형도에서 사용중인 좌표계입니다.
 *  @readonly
 *  @coordinateSystem 동부원점(GRS80)-falseY:60000
 *  @epsg EPSG:5187
 *  */
export const epsg5187: string =
  "+proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";
/** [현재 국토지리정보원 표준]2002년 이후에 국토지리정보원 지형도에서 사용중인 좌표계입니다.
 *  @readonly
 *  @coordinateSystem 동해(울릉)원점(GRS80)-falseY:60000
 *  @epsg EPSG:5188
 *  */
export const epsg5188: string =
  "+proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs";

/**
 *  @param a Semimajor radius of the ellipsoid axis
 *  @param axis Axis orientation
 *  @param b Semiminor radius of the ellipsoid axis
 *  @param ellps Ellipsoid name (see proj -le)
 *  @param k Scaling factor (deprecated)
 *  @param k_0 Scaling factor
 *  @param lat_0 Latitude of origin
 *  @param lon_0 Central meridian
 *  @param lon_wrap Center longitude to use for wrapping (see below)
 *  @param over Allow longitude output outside -180 to 180 range, disables wrapping (see below)
 *  @param pm Alternate prime meridian (typically a city name, see below)
 *  @param proj Projection name (see proj -l)
 *  @param units meters, US survey feet, etc.
 *  @param vunits vertical units.
 *  @param x_0 False easting
 *  @param y_0 False northing
 *  */
export let epsgOption: any;

/** axis Option
 * @param e Easting
 * @param w Westing
 * @param n Northing
 * @param s Southing
 * @param u Up
 * @param d Down
 * @example axis=enu, axis=neu
 * @description https://proj.org/usage/projections.html?highlight=axis#axis-orientation
 *  */
export let axisOption: any;

/** proj Option
 * @description https://proj.org/operations/projections/index.html?highlight=projections#projections
 * @description https://en.wikibooks.org/wiki/PROJ.4
 *
 */
export let projOption: any;

/** ellps Option
 * @param GRS80 a=6378137.0 rf=298.257222101 GRS 1980(IUGG, 1980)
 * @param airy a=6377563.396 b=6356256.910 Airy 1830
 * @param bessel a=6377397.155 rf=299.1528128 Bessel 1841
 * @param clrk66 a=6378206.4 b=6356583.8 Clarke 1866
 * @param intl a=6378388.0 rf=297. International 1909 (Hayford)
 * @param WGS60 a=6378165.0 rf=298.3 WGS 60
 * @param WGS66 a=6378145.0 rf=298.25 WGS 66
 * @param WGS72 a=6378135.0 rf=298.26 WGS 72
 * @param WGS84 a=6378137.0 rf=298.257223563 WGS 84
 * @param sphere a=6370997.0 b=6370997.0 Normal Sphere (r=6370997)
 * @description https://proj.org/usage/ellipsoids.html#ellipsoids
 */
export let ellpsOption: any;
