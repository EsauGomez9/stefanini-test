import express from 'express'
import cors from 'cors'
import controllers from '../../controllers'

const SERVER = express()

SERVER.set('etag', false)
SERVER.use(express.json())
SERVER.use(cors())
SERVER.use(controllers)

export default SERVER
