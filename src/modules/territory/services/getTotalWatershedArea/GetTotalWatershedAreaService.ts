import { IAmazonCountryRepository } from '@modules/territory/repositories/IAmazonCountryRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetTotalWatershedAreaService {
  constructor(
    @inject('AmazonCountryRepository')
    private amazonCountryRepository: IAmazonCountryRepository
  ) {}

  async execute() {
    const count = await this.amazonCountryRepository.getTotalWatershedArea()
    return { count }
  }
}
