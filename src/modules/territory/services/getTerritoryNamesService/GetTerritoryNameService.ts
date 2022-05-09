import { IAmazonCityRepository } from '@modules/territory/repositories/IAmazonCityRepository'
import { IAmazonCountryRepository } from '@modules/territory/repositories/IAmazonCountryRepository'
import { IAmazonStateRepository } from '@modules/territory/repositories/IAmazonStateRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetTerritoryNameService {
  constructor(
    @inject('AmazonCityRepository')
    private amazonCityRepository: IAmazonCityRepository,
    @inject('AmazonCountryRepository')
    private amazonCountryRepository: IAmazonCountryRepository,
    @inject('AmazonStateRepository')
    private amazonStateRepository: IAmazonStateRepository
  ) {}

  async execute(name: string) {
    const cityNames = await this.amazonCityRepository.getNames(name)
    cityNames.map((city) => (city.type = 'city'))
    const countryNames = await this.amazonCountryRepository.getNames(name)
    countryNames.map((country) => (country.type = 'country'))
    const stateNames = await this.amazonStateRepository.getNames(name)
    stateNames.map((state) => (state.type = 'state'))

    const allNames = cityNames.concat(stateNames).concat(countryNames)

    return allNames
  }
}
