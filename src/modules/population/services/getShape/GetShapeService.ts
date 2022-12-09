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
        min: 10000,
        max: 5000000,
        palette: [
          '#953828',
          '#b2482c',
          '#d0572c',
          '#e3672e',
          '#e77939',
          '#e98942',
          '#ef9f5b',
          '#f4bb78',
          '#fad393',
          '#fad393',
          '#f6f6c8',
        ].reverse(),
      })

    const { urlFormat: url } = image.getMap({
      format: 'png',
    })

    return { url }
  }
}
