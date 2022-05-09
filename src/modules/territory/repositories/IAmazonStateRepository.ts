export interface IAmazonStateRepository {
  getNames(
    name: string
  ): Promise<{ code: string; name: string; type: string }[]>
}
