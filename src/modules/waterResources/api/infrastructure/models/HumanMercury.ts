import { Point } from 'geojson'
import { Entity, PrimaryColumn, Column } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity({ name: 'human_mercury', schema: process.env.SCHEMA })
export class HumanMercury {
  @PrimaryColumn()
  code: string

  @Column({ type: 'geometry', srid: 4326 })
  location: Point

  @Column({ name: 'publication_year' })
  publicationYear: number

  @Column()
  study: string

  @Column()
  author: string

  @Column()
  title: string

  @Column()
  state: string

  @Column({ name: 'age_group' })
  ageGroup: string

  @Column({ name: 'sample_number' })
  sampleNumber: number

  @Column({ name: 'hg_min' })
  hgMin: number

  @Column({ name: 'hg_max' })
  hgMax: number

  @Column({ name: 'hg_mean' })
  hgMean: number

  @Column({ name: 'hg_median' })
  hgMedian: number

  @Column({ name: 'collection_year' })
  collectionYear: string

  @Column()
  community: string

  @Column({ name: 'measurement_unit' })
  measurementUnit: string

  constructor() {
    if (!this.code) {
      this.code = uuidv4()
    }
  }
}
