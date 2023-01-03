import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetShapeAsTilesService {
  async execute() {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/illegal-mining'
    )
    const palette = ee.Dictionary({
      default: 'red',
    })

    const image = featureCollection
      .map(function (feature) {
        return feature.set('myStyle', {
          color: palette.get('default'),
        })
      })
      .style({
        styleProperty: 'myStyle',
      })

    const { urlFormat: url } = image.getMap({
      format: 'png',
    })
    return { url }
  }
}
