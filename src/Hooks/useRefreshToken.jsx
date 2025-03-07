import { useNavigate } from "react-router-dom";
import { refreshToken } from "../API/API";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await refreshToken().then(({ data }) => data);

      const accessToken = response.jwtToken;
      const nombre = response.nombre;
      const cedula = response.documento;
      const apellido = response.apellido;
      const roles = response.roles;
      const direccion = response.direccionPrincipal;
      const telefono = response.telefono;
      const niveles = response.niveles;
      const fechaNacimiento = response.fechaNacimiento;
      const conteo = response.operacion;

      setAuth({
        roles: roles,
        accessToken: accessToken,
        nombre: nombre,
        apellido: apellido,
        cedula: cedula,
        direccion: direccion,
        telefono: telefono,
        fechaNacimiento: fechaNacimiento,
        operacion: conteo,
        niveles: niveles,
      });
      return response.jwtToken;
    } catch (e) {
      if (e?.response?.status === 400) {
        navigate("/", {
          state: { noAutorizado: true },
        });
      }
      console.error(e);
    }
  };

  return refresh;
};

export default useRefreshToken;
