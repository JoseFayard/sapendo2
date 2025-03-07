import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2,
  Stack,
} from "@mui/material";
import { Form, Formik } from "formik";
import { string, object } from "yup";
import TextFieldPersonalizado from "./TextFieldPersonalizado";
import { IconoGuardar } from "./Iconos";
import { axiosPrivate } from "../API/axios";
import {
  OBTENER_ENFERMEDADES,
  OBTENER_INTERVENCIONES,
  OBTENER_MEDICAMENTOS,
  OBTNER_ALERGIAS_CONOCIDAS,
} from "../API/urls";
import Toast from "./Toast";

const DialogoCrear = ({ open, handleClose, tipoCreacion, paciente }) => {
  const datosIniciales = {
    nombre: "",
    fecha: "",
  };

  const VALIDATION_SCHEMA = object().shape({
    nombre: string().required("Este campo es requerido"),
    fecha: string().required("Este campo es requerido"),
  });

  const handleSubmit = async (values) => {
    values.estatus = 1;
    values.idCliente = paciente[0]?.id;

    if (tipoCreacion === 1) {
      try {
        let res = await axiosPrivate.post(OBTNER_ALERGIAS_CONOCIDAS, values);
        Toast.fire({
          icon: "success",
          title: "Creado Correctamente.",
        });
        handleClose();
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: "Ocurrió un error, intente nuevamente.",
        });
        console.error(e);
      }
    }

    if (tipoCreacion === 2) {
      try {
        let res = await axiosPrivate.post(OBTENER_MEDICAMENTOS, values);
        Toast.fire({
          icon: "success",
          title: "Creado Correctamente.",
        });
        handleClose();
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: "Ocurrió un error, intente nuevamente.",
        });
        console.error(e);
      }
    }

    if (tipoCreacion === 3) {
      try {
        let res = await axiosPrivate.post(OBTENER_INTERVENCIONES, values);
        Toast.fire({
          icon: "success",
          title: "Creado Correctamente.",
        });
        handleClose();
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: "Ocurrió un error, intente nuevamente.",
        });
        console.error(e);
      }
    }

    if (tipoCreacion === 4) {
      try {
        let res = await axiosPrivate.post(OBTENER_ENFERMEDADES, values);
        Toast.fire({
          icon: "success",
          title: "Creado Correctamente.",
        });
        handleClose();
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: "Ocurrió un error, intente nuevamente.",
        });
        console.error(e);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <DialogTitle>Agregar</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={datosIniciales}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, getFieldProps }) => (
            <Form>
              <Grid2 container spacing={4}>
                <Grid2 item size={{ xs: 12, md: 12 }} className="form-control">
                  <TextFieldPersonalizado
                    type="text"
                    id="nombre"
                    name="nombre"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Nombre"
                    {...getFieldProps("nombre")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 12 }} className="form-control">
                  <TextFieldPersonalizado
                    type="date"
                    id="fecha"
                    name="fecha"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Fecha"
                    {...getFieldProps("fecha")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid2>
              </Grid2>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ marginTop: 4 }}
                className="form-control"
              >
                <Button
                  color="error"
                  type="button"
                  variant="contained"
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  type="submit"
                  endIcon={<IconoGuardar />}
                >
                  Crear
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default DialogoCrear;
