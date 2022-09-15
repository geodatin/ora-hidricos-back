import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetShapeAsTilesService {
  constructor() {}

  async execute() {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/waterways'
    )
    const { urlFormat: url } = featureCollection.getMap({
      format: 'png',
      color: 'blue',
    })
    return { url }
  }
}