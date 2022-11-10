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

async function getPersonById (req: Request, res: Response): Promise<Response> {
  try {
    return res.send('person')
  } catch (error: unknown) {
    return res.status(500).json({
      message: error
    })
  }
}

async function addPerson (req: Request, res: Response): Promise<Response> {
  try {
    return res.send('person added')
  } catch (error: unknown) {
    return res.status(500).json({
      message: error
    })
  }
}

async function deletePerson (req: Request, res: Response): Promise<Response> {
  try {
    return res.send('person deleted')
  } catch (error: unknown) {
    return res.status(500).json({
      message: error
    })
  }
}

async function updatePerson (req: Request, res: Response): Promise<Response> {
  try {
    return res.send('person updated')
  } catch (error: unknown) {
    return res.status(500).json({
      message: error
    })
  }
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
