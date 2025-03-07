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
import { OBTENER_PACIENTES_DENTISTA } from "../API/urls";
import Toast from "./Toast";
import SelectPersonalizado from "./SelectPersonalizado";

const DialogoAgregarPaciente = ({ open, handleClose, dentista }) => {
  const datosIniciales = {
    nombres: "",
    apellidos: "",
    cedula: "",
    correo: "",
    direccion: "",
    idDentista: dentista,
    fechaNacimiento: "",
    genero: "",
    telefonoPersona: "",
    deDondeVienesReferido: "",
    telefonoContacto: "",
    estadoCivil: "",
    tipoSanguineo: "",
    gradoMaximoEstudios: "",
    ocupacionActual: "",
    estatus: 1,
  };

  const VALIDATION_SCHEMA = object().shape({
    nombres: string().required("Este campo es requerido"),
    apellidos: string().required("Este campo es requerido"),
    cedula: string().required("Este campo es requerido"),
    correo: string().required("Este campo es requerido"),
    direccion: string().required("Este campo es requerido"),
    fechaNacimiento: string().required("Este campo es requerido"),
    genero: string().required("Este campo es requerido"),
    telefonoPersona: string().required("Este campo es requerido"),
    deDondeVienesReferido: string().required("Este campo es requerido"),
    tipoSanguineo: string().required("Este campo es requerido"),
  });

  const handleSubmit = async (values) => {
    try {
      let res = await axiosPrivate.post(OBTENER_PACIENTES_DENTISTA, values);
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
  };

  const SANGRE_OPTIONS = [
    {
      nombre: "A positivo (A +)",
    },
    {
      nombre: "A negativo (A -)",
    },
    {
      nombre: "B positivo (B +)",
    },
    {
      nombre: "B negativo (B -)",
    },
    {
      nombre: "AB positivo (AB +)",
    },
    {
      nombre: "AB negativo (AB -)",
    },
    {
      nombre: "O positivo (O +)",
    },
    {
      nombre: "O negativo (O -)",
    },
  ];

  const opciones_genero = [
    {
      nombre: "F",
    },
    {
      nombre: "M",
    },
  ];

  const opcionesEducacion = [
    {
      nombre: "Primaria No Completada",
    },
    {
      nombre: "Primaria Completada",
    },
    {
      nombre: "Secundaria No Completada",
    },
    {
      nombre: "Secundaria Completada",
    },
    {
      nombre: "Estudios Técnicos No Completados",
    },
    {
      nombre: "Estudios Técnicos Completados",
    },
    {
      nombre: "Pregrado No Completado",
    },
    {
      nombre: "Pregrado Completado",
    },
    {
      nombre: "Posgrado No Completado",
    },
    {
      nombre: "Posgrado Completado",
    },
  ];

  const opcionesReferido = [
    {
      nombre: "Amigo",
    },
    {
      nombre: "Familiar",
    },
    {
      nombre: "Otro Odontólogo",
    },
    {
      nombre: "Otros",
    },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
      <DialogTitle>Crear Paciente</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={datosIniciales}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, getFieldProps }) => (
            <Form>
              <Grid2 container spacing={4}>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <TextFieldPersonalizado
                    type="text"
                    id="cedula"
                    name="cedula"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Cédula"
                    {...getFieldProps("cedula")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <TextFieldPersonalizado
                    type="text"
                    id="nombres"
                    name="nombres"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Nombres"
                    {...getFieldProps("nombres")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <TextFieldPersonalizado
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Apellidos"
                    {...getFieldProps("apellidos")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <TextFieldPersonalizado
                    type="text"
                    id="correo"
                    name="correo"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Correo"
                    {...getFieldProps("correo")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <TextFieldPersonalizado
                    type="text"
                    id="direccion"
                    name="direccion"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Dirección"
                    {...getFieldProps("direccion")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <TextFieldPersonalizado
                    type="text"
                    id="telefonoPersona"
                    name="telefonoPersona"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Número de Teléfono"
                    {...getFieldProps("telefonoPersona")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <TextFieldPersonalizado
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Fecha de Nacimiento"
                    {...getFieldProps("fechaNacimiento")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid2>

                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <SelectPersonalizado
                    type="text"
                    id="genero"
                    name="genero"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Género"
                    {...getFieldProps("genero")}
                    options={opciones_genero}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <SelectPersonalizado
                    type="text"
                    id="tipoSanguineo"
                    name="tipoSanguineo"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Tipo Sanguíneo"
                    {...getFieldProps("tipoSanguineo")}
                    options={SANGRE_OPTIONS}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <SelectPersonalizado
                    type="text"
                    id="gradoMaximoEstudios"
                    name="gradoMaximoEstudios"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Grado Máximo de Estudios"
                    {...getFieldProps("gradoMaximoEstudios")}
                    options={opcionesEducacion}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <TextFieldPersonalizado
                    type="text"
                    id="ocupacionActual"
                    name="ocupacionActual"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="Ocupación Actual"
                    {...getFieldProps("ocupacionActual")}
                  />
                </Grid2>
                <Grid2 item size={{ xs: 6, md: 6 }} className="form-control">
                  <SelectPersonalizado
                    type="text"
                    id="deDondeVienesReferido"
                    name="deDondeVienesReferido"
                    sx={{ width: "90%", marginTop: 2 }}
                    label="¿De Dónde Viene Referido?"
                    {...getFieldProps("deDondeVienesReferido")}
                    options={opcionesReferido}
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

export default DialogoAgregarPaciente;
