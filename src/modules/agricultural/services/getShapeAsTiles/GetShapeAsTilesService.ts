import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetShapeAsTilesService {
  async execute() {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/agro'
    )
    const palette = ee.Dictionary({
      Pecuario: 'aa9f38',
      Agricola: '8b4d30',
    })

    const image = featureCollection
      .map(function (feature) {
        return feature.set('myStyle', {
          color: palette.get(feature.get('USO')),
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
