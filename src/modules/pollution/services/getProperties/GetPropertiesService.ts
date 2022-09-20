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
      'projects/ora-rh/assets/indicators/organic-pollution'
    )
    const point = ee.Geometry.Point([long, lat])
    const filteredGeom = featureCollection.filterBounds(point).first()
    if (!filteredGeom.getInfo()) {
      throw new AppError('Point out of bounds', 400)
    }
    const properties = filteredGeom
      .toDictionary(['id', 'sub_bacia', 'j_condiç'])
      .getInfo()

    return {
      subWatershed: properties.sub_bacia,
      code: properties.id,
      condition: properties.j_condiç,
    }
  }
}
