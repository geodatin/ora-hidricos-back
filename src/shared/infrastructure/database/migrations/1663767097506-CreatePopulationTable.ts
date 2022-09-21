import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePopulationTable1663767097506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'population',
        columns: [
          {
            name: 'code',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'geometry',
            type: 'geometry',
            isNullable: true,
          },
          {
            name: 'nunivotto',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'total',
            type: 'numeric',
            isNullable: true,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
