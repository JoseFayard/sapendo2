import axios from "./axios";

// LOGIN
export const login = (cedula, clave, reCaptcha) => {
  const url = "Login1_InicioSesion/InicioSesion";

  return axios.post(url, {
    cedula: cedula,
    clave: clave,
    reCaptcha: reCaptcha,
  });
};

export const refreshToken = () => {
  const url = "Login1_InicioSesion/refresh-token";

  return axios.post(url);
};

export const pedirCodigoCambioClave = (cedula, correo) => {
  const url = `Login2_CambioContrasena/CorreoCambioClave/${cedula}/${correo}`;

  return axios.post(url);
};

export const cambioClave = (cedula, clave, codigo) => {
  const url = "Login2_CambioContrasena/CambioClave";

  return axios.post(url, {
    cedula: cedula,
    clave: clave,
    codigo: codigo,
  });
};

export const valdiarCorreoCambioContrasena = (cedula, correo) => {
  const url = "Login2_CambioContrasena/CorreoUsuarioValidar";

  return axios.post(url, {
    cedula: cedula,
    correo: correo,
  });
};
