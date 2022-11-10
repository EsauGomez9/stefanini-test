import { Router, Request, Response } from 'express'

const ROUTER = Router()

ROUTER.get('/ping', function (req: Request, res: Response): Response {
  return res.send('online')
})

export default ROUTER
