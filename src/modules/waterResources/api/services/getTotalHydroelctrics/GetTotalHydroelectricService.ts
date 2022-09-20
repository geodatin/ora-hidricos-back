import { inject, injectable } from 'tsyringe'

import { IHydroelectricRepository } from '../../repositories/IHydroelectricRepository'

interface IRequest {
  countryCode?: number
}

@injectable()
export class GetTotalHydroelectricService {
  constructor(
    @inject('HydroelectricRepository')
    private HydroelectricRepository: IHydroelectricRepository
  ) {}

  async execute({ countryCode }: IRequest) {
    const count = await this.HydroelectricRepository.getTotal(countryCode)
    return { count }
  }
}
