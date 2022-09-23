import { IAmazonCountryRepository } from '@modules/territory/repositories/IAmazonCountryRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAreaByCountryService {
  constructor(
    @inject('AmazonCountryRepository')
    private amazonCountryRepository: IAmazonCountryRepository
  ) {}

  async execute() {
    const areaByCountry = await this.amazonCountryRepository.getAreaByCountry()
    return areaByCountry
  }
}
