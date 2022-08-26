import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddCountryCodeColumn1661367064677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE hydric.mining_mine ADD COLUMN country_code integer`
    )
    await queryRunner.query(
      `UPDATE hydric.mining_mine as o SET country_code = (SELECT code FROM hydric.amazon_country as c WHERE ST_Contains(c.geometry, ST_centroid(o.geometry)))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
