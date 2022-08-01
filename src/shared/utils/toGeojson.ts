const geojson: any = require('geojson')

export function toGeojson(data: any, key: string) {
  return geojson.parse(data, { GeoJSON: key })
}
