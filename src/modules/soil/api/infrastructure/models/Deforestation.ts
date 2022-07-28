import { MultiPolygon } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity({ name: 'deforestation', schema: 'hydric' })
export class Deforestation {
  @PrimaryColumn()
  code: string

  @Column({ type: 'geometry', srid: 4326 })
  geometry: MultiPolygon

  @Column({ name: 'id_bho' })
  idBho: string

  @Column({ name: 'watershed_id' })
  watershedId: string

  @Column({ name: 'country_id' })
  countryId: string

  @Column({ name: 'year' })
  year: string

  @Column()
  country: string

  constructor() {
    if (!this.code) {
      this.code = uuidv4()
    }
  }
}
