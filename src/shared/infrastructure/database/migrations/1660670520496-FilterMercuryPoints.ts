import { MigrationInterface, QueryRunner } from 'typeorm'

export class FilterMercuryPoints1660670520496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'delete from hydric.fish_mercury where code not in(select fish.code from hydric.fish_mercury as fish inner join hydric.amazon_country country on St_Contains(country.geometry, fish.location))'
    )
    await queryRunner.query(
      'delete from hydric.human_mercury where code not in(select human.code from hydric.human_mercury as human inner join hydric.amazon_country country on St_Contains(country.geometry, human.location))'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
