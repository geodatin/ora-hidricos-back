import { inject, injectable } from 'tsyringe'

import { IHydroelectricRepository } from '../../repositories/IHydroelectricRepository'

interface IRequest {
  countryCode?: number
  type: 'UHE' | 'PCH'
}

@injectable()
export class GetHydroelectricByStatusService {
  constructor(
    @inject('HydroelectricRepository')
    private HydroelectricRepository: IHydroelectricRepository
  ) {}

  async execute({ type, countryCode }: IRequest) {
    const table = await this.HydroelectricRepository.getByStatus(
      countryCode,
      type
    )
    return table
  }
}
