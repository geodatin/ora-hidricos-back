import 'dotenv-safe/config'
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

export async function insertShapefile(
  shapefilePath: string,
  tableName: string,
  srid: number,
  schema = 'hydric',
  encoding = 'UTF8'
) {
  console.log(
    `shp2pgsql -I -s ${srid}:4326 -W "${encoding}" ${shapefilePath} ${schema}.${tableName} | PGPASSWORD=${process.env.DB_PASSWORD} psql -q -d ${process.env.DB_NAME} -U ${process.env.DB_USER} -h ${process.env.DB_HOST}`
  )
  const { stderr: error } = await execPromise(
    `shp2pgsql -I -s ${srid}:4326 -W "${encoding}" ${shapefilePath} ${schema}.${tableName} | PGPASSWORD=${process.env.DB_PASSWORD} psql -q -d ${process.env.DB_NAME} -U ${process.env.DB_USER} -h ${process.env.DB_HOST}`
  )
  if (error) {
    console.log(error)
  }
}
