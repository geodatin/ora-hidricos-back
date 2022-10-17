import { Hydroelectric } from '../infrastructure/models/Hydroelectric'

export interface IRanking {
  name: string
  amount: number
  country: string
}

export interface ITable {
  type: string
  total: number
  sub: string
}

export interface IHydroelectricRepository {
  create(data: Hydroelectric[]): Promise<void>
  getTotal(countryCode: number): Promise<number>
  getCountriesRanking(countryCode: number): Promise<IRanking[]>
  getPotencyRanking(countryCode: number): Promise<IRanking[]>
  getByStatus(countryCode: number, type: 'UHE' | 'PCH'): Promise<ITable[]>
  getPoints(countryCode: number): Promise<Hydroelectric[]>
}
