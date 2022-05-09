import { types } from 'pg'

types.setTypeParser(types.builtins.INT8, (value: string) => {
  return parseInt(value)
})

types.setTypeParser(types.builtins.FLOAT8, (value: string) => {
  return parseFloat(parseFloat(value).toFixed(2))
})

types.setTypeParser(types.builtins.NUMERIC, (value: string) => {
  return parseFloat(value)
})
