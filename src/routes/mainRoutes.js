import { loginRoute } from './loginRoute.js'
import { registerRoute } from './registerRoute.js'

export const routerApi = (app) => {
  app.get('/', (req, res) => {
    res.send('ServiceDesk')
  })
  app.use('/account/login', loginRoute)
  app.use('/account/register', registerRoute)
}
