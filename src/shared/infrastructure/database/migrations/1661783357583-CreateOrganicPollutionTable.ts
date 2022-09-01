import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOrganicPollutionTable1661783357583
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organic_pollution',
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
            name: 'cocursodag',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cobacia',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nunivotto2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sub_bacia',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qmltesp',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'qmltinc',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'qmlt',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'q95esp',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'q95inc',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'q95nat',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'population',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'cargadbo',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'concentration',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'condition',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qdil5mg',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'qdil40m',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'country_code',
            type: 'integer',
            isNullable: true,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('organic_pollution')
  }
}
