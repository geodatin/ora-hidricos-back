import { ITileDTO } from '@modules/pollution/dtos/ITileDTO'
import { IOrganicPollutionRepository } from '@modules/pollution/repositories/IOrganicPollutionRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  countryCode?: number
  tile: ITileDTO
}

@injectable()
export class GetShapeService {
  constructor(
    @inject('OrganicPollutionRepository')
    private OrganicPollutionRepository: IOrganicPollutionRepository
  ) {}

  async execute({ countryCode, tile }: IRequest) {
    const { mvt } = await this.OrganicPollutionRepository.getShapeAsMvt({
      tile,
      countryCode,
    })
    return mvt
  }
}
