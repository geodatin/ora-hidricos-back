import { Point } from 'geojson'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'water_user_state' })
export class WaterUserState {
  @PrimaryColumn()
  gid: number

  @Column({ name: 'bestowal_type' })
  bestowalType: string

  @Column({ name: 'interference_type' })
  interferenceType: string

  @Column({ name: 'org_name' })
  orgName: string

  @Column({ name: 'bestowal_situation' })
  bestowalSituation: string

  @Column({ name: 'interference_subtype' })
  interferenceSubtype: string

  @Column({ name: 'water_body_name' })
  waterBodyName: string

  @Column({ name: 'goal' })
  goal: string

  @Column({ name: 'valid_date' })
  validDate: string

  @Column({ name: 'avg_flow' })
  avgFlow: string

  @Column({ name: 'max_flow' })
  maxFlow: string

  @Column({ name: 'volume' })
  volume: string

  @Column({ type: 'geometry', srid: 4326, nullable: true })
  geometry: Point

  @Column({ name: 'city_name' })
  cityName: string
}
