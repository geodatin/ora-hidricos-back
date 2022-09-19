import { FloodZone } from '../infrastructure/models/FloodZone'

export interface IRanking {
  name: string
  amount: number
}

export interface IFloodZoneRepository {
  create(record: FloodZone[]): Promise<void>
  getTotalArea(): Promise<number>
  getAreaByZone(): Promise<IRanking[]>
}
