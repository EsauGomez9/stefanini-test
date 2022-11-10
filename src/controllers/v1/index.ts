import { Router } from 'express'
import personController from './person'

const ROUTER = Router()

ROUTER.use('/persons', personController)

export default ROUTER
