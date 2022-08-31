export interface IGetMiningMinePointsDTO {
  countryCode?: number
  tile?: {
    z: number
    x: number
    y: number
    format: 'mvt' | 'pbf'
  }
}
