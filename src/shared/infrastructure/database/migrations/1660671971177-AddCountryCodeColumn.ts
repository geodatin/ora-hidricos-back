import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCountryCodeColumn1660671971177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE hydric.human_mercury ADD COLUMN country_code integer`
    )
    await queryRunner.query(
      `ALTER TABLE hydric.fish_mercury ADD COLUMN country_code integer`
    )
    await queryRunner.query(
      `ALTER TABLE hydric.illegal_mining ADD COLUMN country_code integer`
    )
    await queryRunner.query(
      `ALTER TABLE hydric.oil_field ADD COLUMN country_code integer`
    )
    await queryRunner.query(
      `UPDATE hydric.human_mercury as o SET country_code = (SELECT code FROM hydric.amazon_country as c WHERE ST_Contains(c.geometry, o.location))`
    )
    await queryRunner.query(
      `UPDATE hydric.fish_mercury as o SET country_code = (SELECT code FROM hydric.amazon_country as c WHERE ST_Contains(c.geometry, o.location))`
    )
    await queryRunner.query(
      `UPDATE hydric.illegal_mining as o SET country_code = (SELECT code FROM hydric.amazon_country as c WHERE ST_Contains(c.geometry, ST_centroid(o.geometry)))`
    )
    await queryRunner.query(
      `UPDATE hydric.oil_field as o SET country_code = (SELECT code FROM hydric.amazon_country as c WHERE ST_Contains(c.geometry, ST_centroid(o.geometry)))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
