import ROUTER from '../loaders/express/load.routes'
import supertest from 'supertest'

describe('Server', () => {
  describe('GET /ping', () => {
    test('Expect a status 200', async () => {
      const PING = await supertest(ROUTER).get('/ping')
      expect(PING.text).toBe('online')
    })
  })
})
