import { getConnection } from 'typeorm'

interface IColumnToBeRenamed {
  currentName: string
  newName: string
}

export async function renameColumns(
  columns: IColumnToBeRenamed[],
  schema: string,
  tableName: string
) {
  for (const column of columns) {
    await getConnection().query(`
      ALTER TABLE ${schema}.${tableName} RENAME COLUMN ${column.currentName} TO ${column.newName}
    `)
  }
}
