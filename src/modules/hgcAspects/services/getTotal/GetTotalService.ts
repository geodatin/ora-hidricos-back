import { IHgcAspectsRepository } from '@modules/hgcAspects/repositories/IHgcAspectsRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetTotalService {
  constructor(
    @inject('HgcAspectsRepository')
    private HgcAspectsRepository: IHgcAspectsRepository
  ) {}

  async execute() {
    const count = await this.HgcAspectsRepository.getTotal()
    return { count }
  }
}
