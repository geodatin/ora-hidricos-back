import ee from '@google/earthengine'
import { injectable } from 'tsyringe'
@injectable()
export class GetShapeService {
  async execute() {
    const featureCollection = ee
      .FeatureCollection('projects/ora-rh/assets/indicators/organic-pollution')
      .filterMetadata(
        'j_condiç',
        'not_contains',
        'Atende ao padrão mais restritivo'
      )

    const palette = ee.Dictionary({
      'Acima do limite mais permissível': '3b100f',
      'Atende ao padrão mais permissível': 'a1292a',
    })

    const image = featureCollection
      .map(function (feature) {
        return feature.set('myStyle', {
          color: palette.get(feature.get('j_condiç')),
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
