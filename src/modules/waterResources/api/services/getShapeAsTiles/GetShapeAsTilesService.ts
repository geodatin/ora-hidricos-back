import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetShapeAsTilesService {
  async execute() {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/waterways'
    )
    const image = featureCollection
      .reduceToImage({
        properties: ['id'],
        reducer: ee.Reducer.first(),
      })
      .visualize({
        min: 0,
        max: 1000,
        palette: ['#f38145'],
      })

    const { urlFormat: url } = image.getMap({
      format: 'png',
    })

    return { url }
  }
}
