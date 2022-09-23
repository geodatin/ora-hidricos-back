export interface IRanking {
  name: string
  amount: number
}

export interface IAmazonCountryRepository {
  getNames(
    name: string
  ): Promise<{ code: string; name: string; type: string }[]>
  getTotalWatershedArea(): Promise<number>
  getAreaByCountry(): Promise<any[]>
  getCountryRanking(): Promise<IRanking[]>
}
