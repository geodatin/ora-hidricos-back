import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetShapeService {
  async execute() {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/amazon'
    )
    const { urlFormat: url } = featureCollection.getMap({
      format: 'png',
      color: 'green',
    })
    return { url }
  }
}
