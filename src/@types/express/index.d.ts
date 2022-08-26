// eslint-disable-next-line no-unused-vars
declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    tile: {
      z: number
      x: number
      y: number
      format: 'mvt' | 'pbf'
    }
  }
}
