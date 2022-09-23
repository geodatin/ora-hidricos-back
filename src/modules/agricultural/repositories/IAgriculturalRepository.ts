export interface IRanking {
  name: string
  amount: number
}

export interface IAgriculturalRepository {
  getTotalArea(): Promise<number>
  getAreaByName(): Promise<IRanking[]>
}
