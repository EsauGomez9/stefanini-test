import express from 'express'
import cors from 'cors'
import controllers from '../controllers'
import config from '../config/env.handler'

const { SERVER: { PORT, IP, NODE_ENV } } = config()
const SERVER = express()

SERVER.set('etag', false)
SERVER.use(express.json())
SERVER.use(cors())
SERVER.use(controllers)

SERVER.listen(PORT, IP, function (): void {
  console.log(`Ssstefanini API listen on ${PORT} port. --> (${NODE_ENV})`)
})

export default SERVER
