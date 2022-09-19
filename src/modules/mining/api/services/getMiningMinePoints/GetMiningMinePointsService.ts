import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetMiningMinePointsService {
  constructor() {}

  async execute() {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/mining-mine'
    )
    const { urlFormat: url } = featureCollection.getMap({
      format: 'png',
      color: 'green',
    })
    return { url }
  }
}
