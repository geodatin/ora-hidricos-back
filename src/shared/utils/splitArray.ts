export function splitArray(array: any[], chunckSize: number) {
  const result = []
  for (let i = 0; i < array.length; i += chunckSize) {
    const chunck = array.slice(i, i + chunckSize)
    result.push(chunck)
  }
  return result
}
