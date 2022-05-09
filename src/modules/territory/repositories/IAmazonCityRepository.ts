export interface IAmazonCityRepository {
  getNames(
    name: string
  ): Promise<{ code: string; name: string; type: string }[]>
}
