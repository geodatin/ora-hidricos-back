import { MultiPolygon } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'agricultural', schema: 'hydric' })
export class Agricultural {
  @PrimaryColumn()
  id: string

  @Column({ type: 'geometry', srid: 4326 })
  geom: MultiPolygon

  @Column({ name: 'area_km2' })
  idBho: string

  @Column({ name: 'nome' })
  nome: string
}
