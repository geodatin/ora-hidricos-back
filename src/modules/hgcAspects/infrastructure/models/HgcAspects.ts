import { MultiPolygon } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'hgc_aspects', schema: 'hydric' })
export class HgcAspects {
  @PrimaryColumn()
  code: number

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPolygon

  @Column({ name: 'river_name' })
  riverName: number

  @Column()
  domain: string

  @Column()
  aspect: string
}
