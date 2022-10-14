import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetShapeAsTilesService {
  async execute() {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/flooded-zones'
    )
    const { urlFormat: url } = featureCollection.getMap({
      format: 'png',
      color: '#02607e',
    })
    return { url }
  }
}
