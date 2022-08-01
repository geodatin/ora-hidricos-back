import debbuger from 'debug'

const collectorLog = debbuger('collector')
const databaseLog = debbuger('database')
const appLog = debbuger('app')

export { collectorLog, databaseLog, appLog }
