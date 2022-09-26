type separator = "," | "|";
type coordinateSystemType = "wgs84" | "utmk";

export interface proj4HandlerQuery {
  separator: separator;
  coordinateSystemType: coordinateSystemType;
}
