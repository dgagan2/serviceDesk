const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(500).json({ message: 'Usuario o contraseña invalidos' })
  }
  try {

  } catch (error) {

  }
}
