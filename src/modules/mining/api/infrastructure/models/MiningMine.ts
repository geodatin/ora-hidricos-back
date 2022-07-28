import { MultiPolygon } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity({ name: 'mining_mine', schema: 'hydric' })
export class MiningMine {
  @PrimaryColumn()
  code: number

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPolygon

  @Column()
  country: string

  @Column({ name: 'ext_code' })
  extCode: string

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
