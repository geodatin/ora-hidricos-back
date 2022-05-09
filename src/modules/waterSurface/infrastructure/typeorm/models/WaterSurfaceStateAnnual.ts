import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'water_surface_state_annual', schema: process.env.SCHEMA })
export class WaterSurfaceStateAnnual {
  @PrimaryColumn()
  // @ManyToOne(() => )
  code: number

  @PrimaryColumn()
  year: number

  @Column({ name: 'area_ha' })
  areaHa: number
}
