import { Response, Request } from 'express'
import { IsResponse } from '../../../interfaces/response.interface'
import personService from '../../../services/person.service'

async function getPersonList (req: Request, res: Response): Promise<Response> {
  const { code, response }: IsResponse = await personService.listPerson()
  return res.status(code).send(response)
}

async function getPersonById ({ params }: Request, res: Response): Promise<Response> {
  const { code, response }: IsResponse = await personService.getPersonByUUID(params?.personId)
  return res.status(code).send(response)
}

async function addPerson ({ body }: Request, res: Response): Promise<Response> {
  const { code, response }: IsResponse = await personService.createPerson(body)
  return res.status(code).send(response)
}

async function deletePerson ({ params }: Request, res: Response): Promise<Response> {
  const { code, response }: IsResponse = await personService.deletePerson(params?.personId)
  return res.status(code).send(response)
}

async function updatePerson ({ body, params }: Request, res: Response): Promise<Response> {
  const { code, response }: IsResponse = await personService.updatePerson(params?.personId, body)
  return res.status(code).send(response)
}

async function importPersons (req: Request, res: Response): Promise<Response> {
  try {
    return res.send('persons has been imported')
  } catch (error: unknown) {
    return res.status(500).json({
      message: error
    })
  }
}

export default {
  getPersonList,
  getPersonById,
  addPerson,
  deletePerson,
  updatePerson,
  importPersons
}
