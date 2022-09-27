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
        palette: ['FCFDBF', 'FDAE78', 'EE605E', 'B63679', '711F81', '2C105C'],
      })

    const { urlFormat: url } = image.getMap({
      format: 'png',
    })

    return { url }
  }
}
