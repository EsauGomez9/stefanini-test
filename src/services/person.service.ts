import { PrismaClient } from '@prisma/client'
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
    const PERSON = await prisma.person.create({
      data: payload
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
    const PERSON = await prisma.person.update({
      where: {
        uuid
      },
      data: payload
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
