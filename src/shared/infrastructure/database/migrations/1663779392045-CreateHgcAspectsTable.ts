import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateHgcAspectsTable1663779392045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'hgc_aspects',
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
            name: 'river_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'domain',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'aspect',
            type: 'varchar',
            isNullable: true,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
