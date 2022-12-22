import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

@injectable()
export class GetMiningMinePointsService {
  constructor() {}

  async execute() {
    const featureCollection = ee
      .FeatureCollection('projects/ora-rh/assets/indicators/mining')
      .filterMetadata('fecha_atua', 'contains', '2020')
      .filterMetadata('situacion', 'not_contains', 'sin dato')

    const palette = ee.Dictionary({
      'en exploraciÃ³n': 'cca667',
      'en explotaciÃ³n': '883367',
      'en exploraciÃ³n/en explotaciÃ³n': 'c65390',
      solicitud: '344a8a',
      potencial: 'cdcf37',
      'concesiÃ³n sin actividad': 'efaaae',
    })

    const image = featureCollection
      .map(function (feature) {
        return feature.set('myStyle', {
          color: palette.get(feature.get('leyenda')),
        })
      })
      .style({
        styleProperty: 'myStyle',
      })
    const { urlFormat: url } = image.getMap({
      format: 'png',
      color: 'green',
    })
    return { url }
  }
}
