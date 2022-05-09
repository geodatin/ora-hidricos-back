import { MultiPoint } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'amazon_country', schema: process.env.SCHEMA })
export class AmazonCountry {
  @PrimaryColumn()
  code: number

  @Column()
  name: string

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPoint
}
