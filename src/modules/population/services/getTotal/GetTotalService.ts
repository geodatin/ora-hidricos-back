import { IPopulationRepository } from '@modules/population/repositories/IPopulationRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetTotalService {
  constructor(
    @inject('PopulationRepository')
    private PopulationRepository: IPopulationRepository
  ) {}

  async execute() {
    const count = await this.PopulationRepository.getTotal()
    return { count }
  }
}
