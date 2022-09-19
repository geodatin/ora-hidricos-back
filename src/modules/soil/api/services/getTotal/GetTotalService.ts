import { inject, injectable } from 'tsyringe'

import { IFloodZoneRepository } from '../../repositories/IFloodZoneRepository'

@injectable()
export class GetTotalService {
  constructor(
    @inject('FloodZoneRepository')
    private FloodZoneRepository: IFloodZoneRepository
  ) {}

  async execute() {
    const count = await this.FloodZoneRepository.getTotalArea()
    return { count }
  }
}
