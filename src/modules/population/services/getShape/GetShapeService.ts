import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetShapeService {
  async execute() {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/population'
    )
    const image = featureCollection
      .reduceToImage({
        properties: ['total'],
        reducer: ee.Reducer.first(),
      })
      .visualize({
        min: 132,
        max: 5633481,
        palette: ['#b3cde0', '#6497b1', '#005b96', '#03396c', '#011f4b'],
      })

    const { urlFormat: url } = image.getMap({
      format: 'png',
    })

    return { url }
  }
}
