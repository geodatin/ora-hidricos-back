import { MultiPoint } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'amazon_state', schema: process.env.SCHEMA })
export class AmazonState {
  @PrimaryColumn()
  code: number

  @Column()
  name: string

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPoint
}
