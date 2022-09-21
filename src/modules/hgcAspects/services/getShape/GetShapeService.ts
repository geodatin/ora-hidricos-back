import { IHgcAspectsRepository } from '@modules/hgcAspects/repositories/IHgcAspectsRepository'
import { inject, injectable } from 'tsyringe'

import { toGeojson } from '@shared/utils/toGeojson'

@injectable()
export class GetShapeService {
  constructor(
    @inject('HgcAspectsRepository')
    private HgcAspectsRepository: IHgcAspectsRepository
  ) {}

  async execute() {
    const points = await this.HgcAspectsRepository.getShape()
    const parsed = toGeojson(points)
    return parsed
  }
}
