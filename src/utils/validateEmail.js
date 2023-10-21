const expresiones = {
  txtEmail: /^[a-zA-Z0-9_\-.~]{2,}@[a-zA-Z0-9_\-.~]{2,}\.[a-zA-Z]{2,4}$/
}
const validarEmail = (data) => expresiones.txtEmail.test(data)

export default validarEmail
