import { NextFunction, Request, Response } from 'express'

const validFormats = new Set(['mvt', 'pbf'])

export function checkTile(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let { x, y, z, format } = request.params as any

  if (!validFormats.has(format)) {
    return response.status(400).send({ message: 'Invalid format' })
  }

  x = parseInt(x)
  y = parseInt(y)
  z = parseInt(z)

  const size = 2 ** z
  if (x >= size || y >= size || x < 0 || y < 0) {
    return response.status(400).send({ message: 'Invalid coordinates' })
  }

  request.tile = {
    x,
    y,
    z,
    format,
  }

  return next()
}
