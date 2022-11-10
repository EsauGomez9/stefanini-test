import { Response, Request } from 'express'

async function getPersonList (req: Request, res: Response): Promise<Response> {
  try {
    return res.send('person list')
  } catch (error: unknown) {
    return res.status(500).json({
      message: error
    })
  }
}

export default {
  getPersonList
}
