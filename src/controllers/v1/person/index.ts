import { Router, RequestHandler } from 'express'
import controller from './person.controller'

const ROUTER = Router()

// Get person list
ROUTER.route('/').get(controller.getPersonList as RequestHandler)
// Get a specific person
ROUTER.route('/:personId').get(controller.getPersonById as RequestHandler)

// Add person
ROUTER.route('/').post(controller.addPerson as RequestHandler)
// Update a specific person
ROUTER.route('/:personId').put(controller.updatePerson as RequestHandler)
// Delete a specific person
ROUTER.route('/:personId').delete(controller.deletePerson as RequestHandler)

// Upload CSV
ROUTER.route('/import').delete(controller.importPersons as RequestHandler)

export default ROUTER
