import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      // eslint-disable-next-line
      const response = await axiosPrivate.post(
        "/Login1_InicioSesion/revoke-token"
      );
      setAuth({});
    } catch (e) {
      setAuth({});
      console.error(e);
    }
  };

  return logout;
};

export default useLogout;
