import debbuger from 'debug'

const collectorLog = debbuger('collector')
const databaseLog = debbuger('database')

export { collectorLog, databaseLog }
