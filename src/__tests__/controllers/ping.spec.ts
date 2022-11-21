import ROUTER from '../../loaders/express/load.routes'
import supertest from 'supertest'

describe('- Server', () => {
  describe('GET /ping', () => {
    test('Expect status code 200', async () => {
      const PING = await supertest(ROUTER).get('/ping')
      expect(PING.statusCode).toBe(200)
    })

    test('Expect "online" text', async () => {
      const PING = await supertest(ROUTER).get('/ping')
      expect(PING.text).toBe('online')
    })
  })
})
