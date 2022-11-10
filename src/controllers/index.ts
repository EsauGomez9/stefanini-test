import { Router, Request, Response } from 'express'
import v1 from './v1'

const ROUTER = Router()

ROUTER.use('/v1', v1)

ROUTER.get('/ping', function (req: Request, res: Response): Response {
  return res.send('online')
})

export default ROUTER
