import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

interface IRequest {
  long: number
  lat: number
}

@injectable()
export class GetPropertiesService {
  constructor() {}

  async execute({ long, lat }: IRequest) {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/waterways'
    )
    const point = ee.Geometry.Point([long, lat])
    const filteredGeom = featureCollection.filterBounds(point).first()
    const properties = filteredGeom
      .toDictionary(['id', 'nombre2', 'pais'])
      .getInfo()

    return {
      name: properties.nombre2,
      code: properties.id,
      country: properties.pais,
    }
  }
}
