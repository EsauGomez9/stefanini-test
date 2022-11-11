import { Response, Request } from 'express'
import { IsResponse } from '../../../interfaces/response.interface'
import personService from '../../../services/person.service'
import personImportServ from '../../../services/person.import.service'

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

async function importPersons ({ file }: { file: Express.Multer.File }, res: Response): Promise<Response> {
  try {
    const FILE_NAME: string = file?.filename
    const { code, response }: IsResponse = await personImportServ.importPersonsCSV(FILE_NAME)
    return res.status(code).send(response)
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
