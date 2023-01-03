import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetShapeAsTilesService {
  async execute() {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/oil-field'
    )
    const palette = ee.Dictionary({
      'en exploraciÃ³n': 'dc488b',
      'en explotaciÃ³n': 'ac5190',
      solicitud: '919090',
      potencial: 'efb8cb',
    })

    const image = featureCollection
      .map(function (feature) {
        return feature.set('myStyle', {
          color: palette.get(feature.get('LEYENDA')),
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
