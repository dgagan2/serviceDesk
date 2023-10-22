import { departmentRoute } from './departmentRoute.js'
import { loginRoute } from './loginRoute.js'
import { registerRoute } from './registerRoute.js'
import { userRoutes } from './userRoutes.js'

export const routerApi = (app) => {
  app.get('/', (req, res) => {
    res.send('ServiceDesk')
  })
  app.use('/account/login', loginRoute)
  app.use('/account/register', registerRoute)
  app.use('/user', userRoutes)
  app.use('/department', departmentRoute)
  app.get('*', (req, res) => { res.status(404) })
}
