import { MultiPolygon } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity({ name: 'illegal_mining', schema: 'hydric' })
export class IllegalMining {
  @PrimaryColumn()
  code: number

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPolygon

  @Column()
  description: string

  @Column({ name: 'exploration_method' })
  explorationMethod: string

  @Column()
  substance: string

  @Column()
  contamination: string

  @Column({ name: 'situation_end' })
  situationEnd: number

  @Column({ name: 'information_source' })
  informationSource: string

  @Column()
  institution: string

  @Column()
  link: string

  @Column()
  name: string

  @Column({ name: 'country_code' })
  countryCode: number

  constructor() {
    if (!this.code) {
      this.code = uuidv4()
    }
  }
}
