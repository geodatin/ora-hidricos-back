export interface IGetShapeAsMvtRequestDTO {
  tile: {
    z: number
    x: number
    y: number
    format: 'mvt' | 'pbf'
  }
}

export interface IGetShapeAsMvtResponseDTO {
  mvt: Buffer
}
