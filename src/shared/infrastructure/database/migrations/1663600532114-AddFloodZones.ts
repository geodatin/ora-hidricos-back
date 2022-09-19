import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class AddFloodZones1663600532114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'flood_zone',
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
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'area',
            type: 'numeric',
            isNullable: true,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
