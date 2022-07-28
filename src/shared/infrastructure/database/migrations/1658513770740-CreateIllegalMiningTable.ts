import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateIllegalMiningTable1658513770740
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'illegal_mining',
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
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'exploration_method',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'substance',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contamination',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'situation_end',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'information_source',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'institution',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'link',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('illegal_mining')
  }
}
