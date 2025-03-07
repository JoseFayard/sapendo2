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

const DialogoEdicion = ({ open, handleClose, queEditamos, tipoEdicion }) => {
  //   console.log(queEditamos);

  const datosIniciales = {
    nombre: queEditamos.nombre,
    // fecha: dayjs(queEditamos.fecha).format("YYYY-MM-DD"),
    estatus: queEditamos.estatus,
  };

  //   const axiosPrivate = useAxiosPrivate();

  const VALIDATION_SCHEMA = object().shape({
    nombre: string().required("Este campo es requerido"),
    // fecha: string().required("Este campo es requerido"),
  });

  const handleSubmit = async (values) => {
    values.id = queEditamos.id;

    if (tipoEdicion === 1) {
      try {
        let res = await axiosPrivate.put(OBTNER_ALERGIAS_CONOCIDAS, values);
        Toast.fire({
          icon: "success",
          title: "Actualizado correctamente.",
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

    if (tipoEdicion === 2) {
      try {
        let res = await axiosPrivate.put(OBTENER_MEDICAMENTOS, values);
        Toast.fire({
          icon: "success",
          title: "Actualizado correctamente.",
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

    if (tipoEdicion === 3) {
      try {
        let res = await axiosPrivate.put(OBTENER_INTERVENCIONES, values);
        Toast.fire({
          icon: "success",
          title: "Actualizado correctamente.",
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

    if (tipoEdicion === 4) {
      try {
        let res = await axiosPrivate.put(OBTENER_ENFERMEDADES, values);
        Toast.fire({
          icon: "success",
          title: "Actualizado correctamente.",
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
      <DialogTitle>Editar</DialogTitle>
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
                {/* <Grid2 item size={{ xs: 6, md: 12 }} className="form-control">
                  <TextFieldPersonalizado
                    type="date"
                    id="fecha"
                    name="fecha"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Fecha Inicio"
                    {...getFieldProps("fecha")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid2> */}
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

export default DialogoEdicion;
