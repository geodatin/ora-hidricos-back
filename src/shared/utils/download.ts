import fs from 'fs'
import https from 'https'

/**
 * Download a file from the given url and write to the destination path
 * @param url URL of the file to be downloaded
 * @param destinationPath path to write the downloaded file
 */
export function download(url: string, destinationPath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(destinationPath)
    https.get(
      url,
      {
        rejectUnauthorized: false,
      },
      (response) => {
        response.pipe(file)
        file.on('finish', () => {
          file.close((err) => {
            if (err) reject(err)
            resolve()
          })
        })
      }
    )
  })
}
