import { HgcAspects } from '../infrastructure/models/HgcAspects'

export interface IRanking {
  name: string
  amount: number
}

export interface IHgcAspectsRepository {
  create(data: HgcAspects[]): Promise<void>
  getTotal(): Promise<number>
  getDomainRanking(): Promise<IRanking[]>
  getAspectsRanking(): Promise<IRanking[]>
  getShape(): Promise<HgcAspects[]>
}
