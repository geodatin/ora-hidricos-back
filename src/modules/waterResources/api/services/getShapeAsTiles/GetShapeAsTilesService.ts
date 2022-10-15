import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetShapeAsTilesService {
  async execute() {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/waterways'
    )
    const { urlFormat: url } = featureCollection.getMap({
      format: 'png',
      color: '(178, 166, 55)',
    })
    return { url }
  }
}
