import { protect } from '../middleware/auth.handler.js'
import { verifyToken } from '../services/jwt/tokenSignin.js'
import { categoryServiceRoute } from './categoryServiceRoute.js'
import { commentsRoute } from './commentsRoute.js'
import { departmentRoute } from './departmentRoute.js'
import { loginRoute } from './loginRoute.js'
import { registerRoute } from './registerRoute.js'
import { ticketRoute } from './ticketRoutes.js'
import { uploadImageRoute } from './uploadImage.js'
import { userRoutes } from './userRoutes.js'

export const routerApi = (app) => {
  app.get('/', (req, res) => {
    res.send('ServiceDesk')
  })
  app.use('/account/login', loginRoute)
  app.use('/account/register', registerRoute)
  app.use('/user', userRoutes)
  app.use('/department', departmentRoute)
  app.use('/ticket', ticketRoute)
  app.use('/category', categoryServiceRoute)
  app.use('/comment', commentsRoute)
  app.use('/uploadImage', uploadImageRoute)
  app.post('/validateToken', (req, res) => {
    const { token } = req.body
    try {
      verifyToken(token)
      res.status(200).send('Token valido')
    } catch (error) {
      res.status(500).json(error)
    }
  })
  app.get('*', (req, res) => { res.status(404) })
}
