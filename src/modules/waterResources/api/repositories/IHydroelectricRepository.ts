import { Hydroelectric } from '../infrastructure/models/Hydroelectric'

export interface IRanking {
  name: string
  amount: number
}

export interface IHydroelectricRepository {
  create(data: Hydroelectric[]): Promise<void>
  getTotal(countryCode: number): Promise<number>
  getCountriesRanking(countryCode: number): Promise<IRanking[]>
  getPotencyRanking(countryCode: number): Promise<IRanking[]>
  getPoints(countryCode: number): Promise<Hydroelectric[]>
}
