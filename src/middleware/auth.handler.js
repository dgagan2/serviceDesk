import passport from 'passport'

export function protect () {
  return passport.authenticate('jwt', { session: false })
}

export function checkRoles (...roles) {
  return (req, res, next) => {
    const user = req.user
    if (roles.includes(user.role) && user.state === 'active') {
      next()
    } else {
      next(res.status(403).json({ message: 'No esta autorizado para acceder a este recurso' }))
    }
  }
}
