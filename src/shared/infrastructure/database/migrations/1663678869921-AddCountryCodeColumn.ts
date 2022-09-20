import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCountryCodeColumn1663678869921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE hydric.hydroelectric ADD COLUMN country_code integer`
    )
    await queryRunner.query(
      `UPDATE hydric.hydroelectric as o SET country_code = (SELECT code FROM hydric.amazon_country as c WHERE ST_Contains(c.geometry, o.geometry))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
