import server from './express'
import { RequestHandler } from 'express'

export default function (): void {
  // Loading express server
  server as RequestHandler
}
