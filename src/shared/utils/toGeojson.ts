const geojson: any = require('geojson')

export function toGeojson(data: any, key = 'geometry') {
  return geojson.parse(data, { GeoJSON: key })
}
