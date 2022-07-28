import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateDeforastationTable1658776555343
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deforestation',
        columns: [
          {
            name: 'code',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'geometry',
            type: 'geometry',
            isNullable: true,
          },
          {
            name: 'id_bho',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'watershed_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'country_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'year',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: true,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deforestation')
  }
}
