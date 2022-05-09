import { MultiPoint } from 'geojson'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { AmazonCountry } from './AmazonCountry'
import { AmazonState } from './AmazonState'

@Entity({ name: 'amazon_city', schema: process.env.SCHEMA })
export class AmazonCity {
  @PrimaryColumn()
  code: number

  @Column()
  name: string

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPoint

  @Column({ name: 'country_code' })
  @ManyToOne(() => AmazonCountry)
  @JoinColumn({ name: 'country_code', referencedColumnName: 'code' })
  countryCode: number

  @Column({ name: 'state_code' })
  @ManyToOne(() => AmazonState)
  @JoinColumn({ name: 'state_code', referencedColumnName: 'code' })
  stateCode: number
}
