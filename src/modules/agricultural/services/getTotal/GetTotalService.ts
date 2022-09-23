import { inject, injectable } from 'tsyringe'

import { IAgriculturalRepository } from '../../repositories/IAgriculturalRepository'

@injectable()
export class GetTotalService {
  constructor(
    @inject('AgriculturalRepository')
    private AgriculturalRepository: IAgriculturalRepository
  ) {}

  async execute() {
    const count = await this.AgriculturalRepository.getTotalArea()
    return { count }
  }
}
