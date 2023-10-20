export const routerApi = (app) => {
  app.get('/home', (req, res) => {
    res.send('Hola')
  })
}
