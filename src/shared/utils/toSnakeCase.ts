export function toSnakeCase(column: string): string {
  return column.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}
