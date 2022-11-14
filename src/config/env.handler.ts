import path from 'path'
import dotenv from 'dotenv'
import { IsServer, IsConfigEnviroment } from '../interfaces/config'

dotenv.config({
  path: path.resolve(__dirname, getNodeEnviroment())
})

function getNodeEnviroment (): string {
  const ENVIROMENT = String(process.env.NODE_ENV ?? 'development')
  if (ENVIROMENT === 'production') {
    return '../../.production.env'
  } else {
    return '../../.env'
  }
}

function getServer (): IsServer {
  return {
    NODE_ENV: String(process.env.NODE_ENV ?? 'development'),
    IP: String(process.env.IP ?? '127.0.0.1'),
    PORT: Number(process.env.PORT ?? 3001)
  }
}

export default function (): IsConfigEnviroment {
  return {
    SERVER: getServer()
  }
}
