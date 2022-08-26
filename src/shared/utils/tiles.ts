interface IEnvelope {
  xmin: number
  xmax: number
  ymin: number
  ymax: number
}

interface ITile {
  z: number
  x: number
  y: number
  format: 'mvt' | 'pbf'
}

/**
 * Calculate envelope in "Spherical Mercator" (https://epsg.io/3857)
 * @param tile Object with tile coordinates, format and zoom level
 */
export function tileToEnvelope(tile: ITile): IEnvelope {
  // Width of world in EPSG:3857
  const worldMercMax = 20037508.3427892
  const worldMercMin = -1 * worldMercMax
  const worldMercSize = worldMercMax - worldMercMin

  // Width in tiles
  const worldTileSize = 2 ** tile.z
  // Tile width in EPSG:3857
  const tileMercSize = worldMercSize / worldTileSize
  // Calculate geographic bounds from tile coordinates
  // XYZ tile coordinates are in "image space" so origin is
  // top-left, not bottom right
  const envelope = {
    xmin: worldMercMin + tileMercSize * tile.x,
    xmax: worldMercMin + tileMercSize * (tile.x + 1),
    ymin: worldMercMax - tileMercSize * (tile.y + 1),
    ymax: worldMercMax - tileMercSize * tile.y,
  }
  return envelope
}

/**
 * Generate SQL to materialize a query envelope in EPSG:3857.
 * Densify the edges a little so the envelope can be safely converted to other coordinate systems.
 */
export function envelopeToBoundsSQL(envelope: IEnvelope): string {
  const DENSIFY_FACTOR = 4
  const segSize = (envelope.xmax - envelope.xmin) / DENSIFY_FACTOR
  return `ST_Segmentize(ST_MakeEnvelope(${envelope.xmin}, ${envelope.ymin}, ${envelope.xmax}, ${envelope.ymax}, 3857),${segSize})`
}
