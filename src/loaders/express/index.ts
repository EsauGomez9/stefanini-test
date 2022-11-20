import SERVER from './load.routes'
import config from '../../config/env.handler'

const { SERVER: { PORT, IP, NODE_ENV } } = config()

SERVER.listen(PORT, IP, function (): void {
  console.log(`Stefanini API listen on ${PORT} port. --> (${NODE_ENV})`)
})

export default SERVER
