import axios from 'axios'
import { createWriteStream } from 'fs'

export function download(url: string, destinationPath: string): Promise<void> {
  const writer = createWriteStream(destinationPath)
  return new Promise<void>((resolve, reject) => {
    axios.get(url, { responseType: 'stream' }).then((response) => {
      console.log(destinationPath)
      response.data.pipe(writer)
      writer.on('error', reject)
      writer.on('finish', resolve)
    })
  })
}
