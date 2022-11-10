import { Router, RequestHandler } from 'express'
import controller from './person.controller'

const ROUTER = Router()

ROUTER.route('/').get(controller.getPersonList as RequestHandler)

export default ROUTER
