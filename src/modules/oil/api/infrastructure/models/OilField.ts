import { MultiPolygon } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity({ name: 'oil_field', schema: 'hydric' })
export class OilField {
  @PrimaryColumn()
  code: number

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPolygon

  @Column()
  country: string

  @Column()
  name: string

  @Column()
  company: string

  @Column()
  situation: string

  @Column()
  source: string

  @Column()
  institution: string

  constructor() {
    if (!this.code) {
      this.code = uuidv4()
    }
  }
}
