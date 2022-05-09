import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'water_surface_city_annual', schema: process.env.SCHEMA })
export class WaterSurfaceCityAnnual {
  @PrimaryColumn()
  // @ManyToOne(() => )
  code: number

  @PrimaryColumn()
  year: number

  @Column({ name: 'area_ha' })
  areaHa: number
}
