export interface IGetRankingRequestDTO {
  rankingType: 'area' | 'winLoss'
}

export interface IGetRankingResponseDTO {
  name: string
  area: number
  code: number
}
