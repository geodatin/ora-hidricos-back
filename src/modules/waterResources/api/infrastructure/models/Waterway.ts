import { MultiPolygon } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity({ name: 'waterway', schema: 'hydric' })
export class Waterway {
  @PrimaryColumn()
  code: number

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPolygon

  @Column()
  country: string

  @Column()
  name: string

  constructor() {
    if (!this.code) {
      this.code = uuidv4()
    }
  }
}
