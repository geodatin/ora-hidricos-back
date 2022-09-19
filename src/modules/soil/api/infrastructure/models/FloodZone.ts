import { MultiPolygon } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity({ name: 'flood_zone', schema: 'hydric' })
export class FloodZone {
  @PrimaryColumn()
  code?: string

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPolygon

  @Column()
  name: string

  @Column()
  area: number

  constructor() {
    if (!this.code) {
      this.code = uuidv4()
    }
  }
}
