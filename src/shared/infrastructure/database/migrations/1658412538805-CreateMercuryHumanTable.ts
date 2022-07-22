import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMercuryHumanTable1658412538805
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'human_mercury',
        columns: [
          {
            name: 'code',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'location',
            type: 'geometry',
            isNullable: true,
          },
          {
            name: 'publication_year',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'study',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'author',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'age_group',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sample_number',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'hg_min',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'hg_max',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'hg_mean',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'hg_median',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'collection_year',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'community',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'measurement_unit',
            type: 'varchar',
            isNullable: true,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('human_mercury')
  }
}
