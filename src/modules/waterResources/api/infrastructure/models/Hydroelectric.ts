import { MultiPolygon } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'hydroelectric', schema: 'hydric' })
export class Hydroelectric {
  @PrimaryColumn()
  code: number

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPolygon

  @Column()
  type: string

  @Column()
  country: string

  @Column()
  source: string

  @Column()
  potency: number

  @Column()
  sub: string

  @Column()
  institution: string

  @Column()
  company: string

  @Column()
  name: string

  @Column()
  status: string

  @Column({ name: 'country_code' })
  countryCode: number
}
