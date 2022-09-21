import { MultiPolygon } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'population', schema: 'hydric' })
export class Population {
  @PrimaryColumn()
  code: number

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPolygon

  @Column()
  total: number

  @Column()
  nunivotto: string
}
