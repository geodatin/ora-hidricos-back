import { Population } from '../infrastructure/models/Population'

export interface IRanking {
  name: string
  amount: number
}

export interface IPopulationRepository {
  create(data: Population[]): Promise<void>
  getTotal(): Promise<number>
  getWatershedRanking(): Promise<IRanking[]>
  getShape(): Promise<Population[]>
}
