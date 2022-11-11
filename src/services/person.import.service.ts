import { PrismaClient } from '@prisma/client'
import convertCsv from 'csvtojson'
import path from 'path'
import moment from 'moment'
import fs from 'fs'
import sleep from 'sleep-promise'
import { v4 as uuidv4 } from 'uuid'
import { IsResponse } from '../interfaces/response.interface'
import { successRequest, notfoundRequest } from '../utils/response'
const prisma = new PrismaClient()

async function importPersonsCSV (FILE_NAME: string): Promise<IsResponse> {
  try {
    const FILE_PATH: string = path.resolve(__dirname, `../../uploads/temp/${FILE_NAME}`)
    const PERSONS_OBJECT: any = await convertCsv().fromFile(FILE_PATH)
    const today = moment()

    const PAGES = PERSONS_OBJECT.length / 1000
    const PAGINATION = {
      page_limit: (PAGES - Math.floor(PAGES) > 0) ? Math.floor(PAGES) + 1 : Math.floor(PAGES),
      page_curr: 1,
      record_total: PERSONS_OBJECT.length ?? 0,
      record_page: 0,
      record_curr: 0,
      records_added: 0
    }

    while (PAGINATION.page_curr <= PAGINATION.page_limit) {
      PAGINATION.record_page = ((PAGINATION.page_curr) * 1000)
      const RECORD_LIMIT = (PAGINATION.record_page <= PAGINATION.record_total)
        ? PAGINATION.record_page
        : PAGINATION.record_total
      const CURR_PAGE_OBJ = []

      while (PAGINATION.record_curr < RECORD_LIMIT) {
        const PERSON = PERSONS_OBJECT[PAGINATION.record_curr]
        CURR_PAGE_OBJ[PAGINATION.record_curr] = {
          ...PERSON,
          uuid: uuidv4(),
          country_residence: PERSON?.country_residence.replace(' ', '_') ?? '',
          age: Number(today.diff(moment(PERSON?.birth_date), 'years') ?? 0),
          birth_date: moment(PERSON?.birth_date).toISOString()
        }
        PAGINATION.record_curr++
      }
      const { code, response }: IsResponse = await addPersonsDB(CURR_PAGE_OBJ)
      if (code === 200) PAGINATION.records_added += Number(response.count ?? 0)
      PAGINATION.page_curr++
    }

    // moving file
    if (PAGINATION.records_added > 0) {
      await movingTempFile(FILE_NAME)
    } else {
      await movingTempFile(FILE_NAME)
    }

    return successRequest({
      code: (PAGINATION.records_added > 0) ? 200 : 500,
      response: {
        records_recived: PERSONS_OBJECT.length,
        added_records: PAGINATION.records_added
      }
    })
  } catch (error: unknown) {
    console.log(error)
    return notfoundRequest('ERROR_IMPORTING_PERSON')
  } finally {
    await prisma.$disconnect()
  }
}

async function addPersonsDB (payload: any): Promise<IsResponse> {
  try {
    await sleep(50)
    const PERSON_ADDED = await prisma.person.createMany({
      data: payload
    })
    console.log(`---> (${PERSON_ADDED.count}) records imported.`)
    return {
      code: 200,
      response: {
        data: PERSON_ADDED,
        count: PERSON_ADDED.count
      }
    }
  } catch (error: unknown) {
    console.log(error)
    return {
      code: 500,
      response: {
        exeption: error
      }
    }
  }
}

async function movingTempFile (filename: string): Promise<boolean | undefined> {
  try {
    const SOURCE: string = path.resolve(__dirname, `../../uploads/temp/${filename}`)
    const TARGET: string = path.resolve(__dirname, `../../uploads/imported/${filename}`)

    fs.rename(SOURCE, TARGET, (err) => {
      if (err != null) return false
      console.log(`---> (${filename}) file moved to imported files.`)
      return true
    })
  } catch (error) {
    return false
  }
}

export default {
  importPersonsCSV
}
