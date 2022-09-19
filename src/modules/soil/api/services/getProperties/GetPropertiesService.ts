import ee from '@google/earthengine'
import { injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'

interface IRequest {
  long: number
  lat: number
}

@injectable()
export class GetPropertiesService {
  constructor() {}

  async execute({ long, lat }: IRequest) {
    const featureCollection = ee.FeatureCollection(
      'projects/ora-rh/assets/indicators/flooded-zones'
    )
    const point = ee.Geometry.Point([long, lat])
    const filteredGeom = featureCollection.filterBounds(point).first()
    if (!filteredGeom.getInfo()) {
      throw new AppError('Point out of bounds', 400)
    }
    const properties = filteredGeom
      .toDictionary(['id', 'nome', 'areaha'])
      .getInfo()

    return {
      name: properties.nome,
      code: properties.id,
      area: properties.areaha,
    }
  }
}
