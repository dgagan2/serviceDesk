const expresiones = {
  txtPassword: /^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9!@#$%^&.\-_\-.,"';~*?_~/]{6,20}$/
}

const validarPassword = (data) => expresiones.txtPassword.test(data)

export default validarPassword
