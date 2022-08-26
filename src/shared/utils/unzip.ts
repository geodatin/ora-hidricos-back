import fs from 'fs'
import unzipper from 'unzipper'

export async function unzipFile(
  path: string,
  outputPath: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(unzipper.Extract({ path: outputPath }))
      .on('close', () => resolve())
      .on('error', (err) => {
        reject(err)
      })
  })
}
