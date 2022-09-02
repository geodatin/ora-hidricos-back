import { MultiPolygon } from 'geojson'
import { Entity, PrimaryColumn, Column } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity({ name: 'organic_pollution', schema: process.env.SCHEMA })
export class OrganicPollution {
  @PrimaryColumn()
  code: string

  @Column({ type: 'geometry', srid: 4326, nullable: true })
  geometry: MultiPolygon

  @Column()
  cocursodag: string

  @Column()
  cobacia: string

  @Column()
  nunivotto2: string

  @Column({ name: 'sub_bacia' })
  subBacia: string

  @Column()
  qmltesp: number

  @Column()
  qmltinc: number

  @Column()
  qmlt: number

  @Column()
  q95esp: number

  @Column()
  q95inc: number

  @Column()
  q95nat: number

  @Column()
  population: number

  @Column()
  cargadbo: number

  @Column()
  concentration: number

  @Column()
  condition: string

  @Column()
  qdil5mg: number

  @Column()
  qdil40m: number

  @Column({ name: 'countryCode' })
  countryCode: number

  constructor() {
    if (!this.code) {
      this.code = uuidv4()
    }
  }
}
