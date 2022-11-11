import { PrismaClient } from '@prisma/client'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { IsResponse } from '../interfaces/response.interface'
import { successRequest, badRequest, notfoundRequest } from '../utils/response'
const prisma = new PrismaClient()

async function listPerson (): Promise<IsResponse> {
  try {
    const PERSONS = await prisma.person.findMany()
    return successRequest(PERSONS)
  } catch (error: unknown) {
    return badRequest()
  } finally {
    await prisma.$disconnect()
  }
}

async function getPersonByUUID (uuid: string): Promise<IsResponse> {
  try {
    const PERSONS = await prisma.person.findFirst({
      where: { uuid }
    })
    return successRequest(PERSONS ?? {})
  } catch (error: unknown) {
    return notfoundRequest('PERSON_NOT_FOUND')
  } finally {
    await prisma.$disconnect()
  }
}

async function createPerson (payload: any): Promise<IsResponse> {
  try {
    const today = moment()
    const PERSON = await prisma.person.create({
      data: {
        ...payload,
        uuid: uuidv4(),
        country_residence: payload?.country_residence.replace(' ', '_') ?? '',
        age: Number(today.diff(moment(payload?.birth_date), 'years') ?? 0),
        birth_date: moment(payload?.birth_date).toISOString()
      }
    })
    return successRequest(PERSON)
  } catch (error: unknown) {
    return badRequest()
  } finally {
    await prisma.$disconnect()
  }
}

async function updatePerson (uuid: string, payload: any): Promise<IsResponse> {
  try {
    const today = moment()
    const PERSON = await prisma.person.update({
      where: {
        uuid
      },
      data: {
        ...payload,
        country_residence: payload?.country_residence.replace(' ', '_') ?? '',
        age: Number(today.diff(moment(payload?.birth_date), 'years') ?? 0),
        birth_date: moment(payload?.birth_date).toISOString()
      }
    })
    return successRequest(PERSON)
  } catch (error: unknown) {
    return badRequest()
  } finally {
    await prisma.$disconnect()
  }
}

async function deletePerson (uuid: string): Promise<IsResponse> {
  try {
    const PERSON = await prisma.person.delete({
      where: { uuid }
    })
    return successRequest(PERSON)
  } catch (error: unknown) {
    return notfoundRequest('PERSON_NOT_FOUND')
  } finally {
    await prisma.$disconnect()
  }
}

export default {
  createPerson,
  updatePerson,
  deletePerson,
  listPerson,
  getPersonByUUID
}
