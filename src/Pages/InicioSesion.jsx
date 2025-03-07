import { Button } from "@mui/material";
import { Link } from "react-router";

const InicioSesion = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to="/buscar-paciente"
    >
      Buscar Paciente
    </Button>
  );
};

export default InicioSesion;
