import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Fab,
  Grid2,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import {
  IconoADN,
  IconoAlergias,
  IconoBioHazard,
  IconoBusqueda,
  IconoCerebro,
  IconoCorazon,
  IconoLapiz,
  IconoMas,
  IconoOjo,
  IconoPapelera,
} from "../Components/Iconos";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../API/axios";

import {
  GEMINI,
  OBTENER_ENFERMEDADES,
  OBTENER_INTERVENCIONES,
  OBTENER_MEDICAMENTOS,
  OBTENER_PACIENTES_DENTISTA,
  OBTNER_ALERGIAS_CONOCIDAS,
} from "../API/urls";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TablaGenerica from "../Components/TablaGenerica";
import { fechaLegible } from "../Utils/funcionesUtiles";
import DialogoEdicion from "../Components/DialogoEdicion";
import Swal from "sweetalert2";
import Toast from "../Components/Toast";
import DialogoCrear from "../Components/DialogoCrear";
import DialogoAgregarPaciente from "../Components/DialogoAgregarPaciente";
import { Link } from "react-router";
import Loader from "../Components/Loader";
const BuscarPaciente = () => {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteElegido, setPacienteElegido] = useState({});
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [cargando, setCargando] = useState(true);
  // const [alergias, setAlergias] = useState([]);
  const [data, setData] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [intervenciones, setIntervenciones] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [open, setOpen] = useState(false);
  const [queEditamos, setQueEditamos] = useState({});
  const [tipoEdicion, setTipoEdicion] = useState(0);
  const [tipoCreacion, setTipoCreacion] = useState(0);
  const [openCrear, setOpenCrear] = useState(false);
  const [infoPacientes, setInfoPacientes] = useState([]);
  const [openAgregarUsuario, setOpenAgregarUsuario] = useState(false);
  const [pacienteElegidoParaTodo, setPacienteElegidoParaTodo] = useState({});
  const [cargandoIA, setCargandoIA] = useState(false);

  const [gemini, setGemini] = useState("");

  const getPacientes = async () => {
    try {
      let res = await axiosPrivate
        .get(`${OBTENER_PACIENTES_DENTISTA}/${1}`)
        .then(({ data }) => data);
      setPacientes(
        res.map((item) => {
          return { id: item.id, label: `${item.nombres} ${item.apellidos}` };
        })
      );
      setInfoPacientes(res);
      setCargando(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPacientes();
  }, []);

  const handleClose = async () => {
    setOpen(false);
    setOpenCrear(false);
    setOpenAgregarUsuario(false);

    let paciente = pacientes.filter((item) => item?.id === value?.id);
    let pacienteID = paciente[0]?.id;

    try {
      let res = await axiosPrivate
        .get(`${OBTNER_ALERGIAS_CONOCIDAS}/${pacienteID}`)
        .then(({ data }) => data);
      let res2 = await axiosPrivate
        .get(`${OBTENER_MEDICAMENTOS}/${pacienteID}`)
        .then(({ data }) => data);

      let res3 = await axiosPrivate
        .get(`${OBTENER_INTERVENCIONES}/${pacienteID}`)
        .then(({ data }) => data);

      let res4 = await axiosPrivate
        .get(`${OBTENER_ENFERMEDADES}/${pacienteID}`)
        .then(({ data }) => data);
      setData(res.filter((item) => item.estatus > 0));
      setMedicamentos(res2.filter((item) => item.estatus > 0));
      setIntervenciones(res3.filter((item) => item.estatus > 0));
      setEnfermedades(res4.filter((item) => item.estatus > 0));
    } catch (e) {
      console.error(e);
    }
  };

  const buscarPaciente = async () => {
    let paciente = pacientes.filter((item) => item?.id === value?.id);
    let pacienteID = paciente[0]?.id;

    setPacienteElegido(paciente);

    try {
      let res = await axiosPrivate
        .get(`${OBTNER_ALERGIAS_CONOCIDAS}/${pacienteID}`)
        .then(({ data }) => data);
      let res2 = await axiosPrivate
        .get(`${OBTENER_MEDICAMENTOS}/${pacienteID}`)
        .then(({ data }) => data);

      let res3 = await axiosPrivate
        .get(`${OBTENER_INTERVENCIONES}/${pacienteID}`)
        .then(({ data }) => data);

      let res4 = await axiosPrivate
        .get(`${OBTENER_ENFERMEDADES}/${pacienteID}`)
        .then(({ data }) => data);

      setData(res.filter((item) => item.estatus > 0));
      setMedicamentos(res2.filter((item) => item.estatus > 0));
      setIntervenciones(res3.filter((item) => item.estatus > 0));
      setEnfermedades(res4.filter((item) => item.estatus > 0));

      setPacienteElegidoParaTodo(
        infoPacientes.filter((item) => item.id === paciente[0]?.id)[0]
      );
    } catch (e) {
      console.error(e);
    }
  };

  const sugerenciaIA = async () => {
    // console.log(pacienteElegido);
    if (Object.keys(pacienteElegido).length === 0) {
      Toast.fire({
        icon: "error",
        title: "Debe elegir un paciente.",
      });
      return;
    }

    setCargandoIA(true);

    let pacienteID = pacienteElegido[0]?.id;

    try {
      let res5 = await axiosPrivate
        .post(GEMINI, {
          prompt: "1",
          idCliente: pacienteID,
        })
        .then(({ data }) => data);

      setGemini(res5.candidates[0].content.parts[0].text);

      setCargandoIA(false);
    } catch (e) {
      console.error(e);
      setCargandoIA(false);
    }
  };

  const editar = (value, tipo) => {
    setOpen(true);
    setQueEditamos(value);
    setTipoEdicion(tipo);
  };

  const eliminar = async (value, tipo) => {
    Swal.fire({
      title: "¿Está seguro que desea eliminar la información del paciente?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "dark-mode-popup",
        title: "dark-mode-title",
        content: "dark-mode-content",
        confirmButton: "dark-mode-confirm",
      },
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (tipo === 1) {
          let values = value;
          values.estatus = 0;
          try {
            let res = await axiosPrivate.put(OBTNER_ALERGIAS_CONOCIDAS, values);
            Toast.fire({
              icon: "success",
              title: "Eliminado Correctamente.",
            });
            setData((prev) => prev.filter((item) => item.id !== values.id));
            handleClose();
          } catch (e) {
            Toast.fire({
              icon: "error",
              title: "Ocurrió un error, intente nuevamente.",
            });
            console.error(e);
          }
        }

        if (tipo === 2) {
          let values = value;
          values.estatus = 0;
          try {
            let res = await axiosPrivate.put(OBTENER_MEDICAMENTOS, values);
            Toast.fire({
              icon: "success",
              title: "Eliminado Correctamente.",
            });
            setMedicamentos((prev) =>
              prev.filter((item) => item.id !== values.id)
            );
            handleClose();
          } catch (e) {
            Toast.fire({
              icon: "error",
              title: "Ocurrió un error, intente nuevamente.",
            });
            console.error(e);
          }
        }

        if (tipo === 3) {
          let values = value;
          values.estatus = 0;
          try {
            let res = await axiosPrivate.put(OBTENER_INTERVENCIONES, values);
            Toast.fire({
              icon: "success",
              title: "Eliminado Correctamente.",
            });
            setIntervenciones((prev) =>
              prev.filter((item) => item.id !== values.id)
            );
            handleClose();
          } catch (e) {
            Toast.fire({
              icon: "error",
              title: "Ocurrió un error, intente nuevamente.",
            });
            console.error(e);
          }
        }

        if (tipo === 4) {
          let values = value;
          values.estatus = 0;
          try {
            let res = await axiosPrivate.put(OBTENER_ENFERMEDADES, values);
            Toast.fire({
              icon: "success",
              title: "Eliminado Correctamente.",
            });
            setEnfermedades((prev) =>
              prev.filter((item) => item.id !== values.id)
            );
            handleClose();
          } catch (e) {
            Toast.fire({
              icon: "error",
              title: "Ocurrió un error, intente nuevamente.",
            });
            console.error(e);
          }
        }
      }
    });
  };

  const agregarInformacion = async (tipo) => {
    setOpenCrear(true);
    setTipoCreacion(tipo);
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("nombre", {
      cell: (info) => info.getValue(),
      header: () => <span>Nombre</span>,
    }),
    columnHelper.accessor("fecha", {
      cell: (info) => fechaLegible(info.getValue()),
      header: () => <span>Fecha</span>,
    }),
    columnHelper.accessor("acciones", {
      cell: ({ row }) => {
        return (
          <>
            <Tooltip title="Editar">
              <IconButton
                color="info"
                variant="contained"
                size="medium"
                onClick={() => editar(row.original, 1)}
              >
                <IconoLapiz />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                color="error"
                variant="contained"
                size="medium"
                onClick={() => eliminar(row.original, 1)}
              >
                <IconoPapelera />
              </IconButton>
            </Tooltip>
          </>
        );
      },
      header: () => <span>Acciones</span>,
    }),
  ];

  const columnsMedicamentos = [
    columnHelper.accessor("nombre", {
      cell: (info) => info.getValue(),
      header: () => <span>Nombre</span>,
    }),
    columnHelper.accessor("fecha", {
      cell: (info) => fechaLegible(info.getValue()),
      header: () => <span>Fecha</span>,
    }),
    columnHelper.accessor("acciones", {
      cell: ({ row }) => {
        return (
          <>
            <Tooltip title="Editar">
              <IconButton
                color="info"
                variant="contained"
                size="medium"
                onClick={() => editar(row.original, 2)}
              >
                <IconoLapiz />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                color="error"
                variant="contained"
                size="medium"
                onClick={() => eliminar(row.original, 2)}
              >
                <IconoPapelera />
              </IconButton>
            </Tooltip>
          </>
        );
      },
      header: () => <span>Acciones</span>,
    }),
  ];

  const columnsIntervenciones = [
    columnHelper.accessor("nombre", {
      cell: (info) => info.getValue(),
      header: () => <span>Nombre</span>,
    }),
    columnHelper.accessor("fecha", {
      cell: (info) => fechaLegible(info.getValue()),
      header: () => <span>Fecha</span>,
    }),
    columnHelper.accessor("acciones", {
      cell: ({ row }) => {
        return (
          <>
            <Tooltip title="Editar">
              <IconButton
                color="info"
                variant="contained"
                size="medium"
                onClick={() => editar(row.original, 3)}
              >
                <IconoLapiz />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                color="error"
                variant="contained"
                size="medium"
                onClick={() => eliminar(row.original, 3)}
              >
                <IconoPapelera />
              </IconButton>
            </Tooltip>
          </>
        );
      },
      header: () => <span>Acciones</span>,
    }),
  ];

  const columnsEnfermedades = [
    columnHelper.accessor("nombre", {
      cell: (info) => info.getValue(),
      header: () => <span>Nombre</span>,
    }),
    columnHelper.accessor("fecha", {
      cell: (info) => fechaLegible(info.getValue()),
      header: () => <span>Fecha</span>,
    }),
    columnHelper.accessor("acciones", {
      cell: ({ row }) => {
        return (
          <>
            <Tooltip title="Editar">
              <IconButton
                color="info"
                variant="contained"
                size="medium"
                onClick={() => editar(row.original, 4)}
              >
                <IconoLapiz />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                color="error"
                variant="contained"
                size="medium"
                onClick={() => eliminar(row.original, 4)}
              >
                <IconoPapelera />
              </IconButton>
            </Tooltip>
          </>
        );
      },
      header: () => <span>Acciones</span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableIntervenciones = useReactTable({
    data: intervenciones,
    columns: columnsIntervenciones,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableEnfermedades = useReactTable({
    data: enfermedades,
    columns: columnsEnfermedades,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableMedicamentos = useReactTable({
    data: medicamentos,
    columns: columnsMedicamentos,
    getCoreRowModel: getCoreRowModel(),
  });

  const agregarPaciente = () => {
    setOpenAgregarUsuario(true);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        className="botonFlotante"
        variant="extended"
        onClick={sugerenciaIA}
        disabled={cargandoIA}
      >
        <IconoCerebro style={{ marginRight: 10 }} />
        IA
      </Fab>
      <Navbar />
      <Container maxWidth="" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid2 container spacing={4}>
            <Grid2 item size={{ md: 12 }} sx={{ marginBottom: 2 }}>
              {/* <Card sx={{ minWidth: 275 }}> */}
              {/* <CardContent> */}
              <div className="buscadorCentrado">
                {cargando ? null : (
                  <Autocomplete
                    disablePortal
                    options={pacientes}
                    sx={{ width: 500 }}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Buscar Paciente" />
                    )}
                  />
                )}
                <Button
                  color="info"
                  variant="contained"
                  sx={{ marginLeft: 1, width: 200 }}
                  size="medium"
                  endIcon={<IconoBusqueda />}
                  onClick={buscarPaciente}
                >
                  Buscar
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  sx={{ marginLeft: 1, width: 200 }}
                  size="medium"
                  endIcon={<IconoMas />}
                  onClick={agregarPaciente}
                >
                  Crear Paciente
                </Button>
              </div>
              {/* </CardContent> */}
              {/* </Card> */}
            </Grid2>
            {Object.keys(pacienteElegidoParaTodo).length === 0 ? null : (
              <Grid2 size={{ md: 12 }}>
                <Card>
                  <CardContent>
                    <Grid2 container spacing={2} sx={{ marginTop: 1 }}>
                      <Grid2 item size={{ md: 6 }}>
                        <Typography variant="h1">
                          {pacienteElegidoParaTodo?.nombres.toUpperCase()}
                        </Typography>
                        <Typography variant="h1">
                          {pacienteElegidoParaTodo?.apellidos.toUpperCase()}
                        </Typography>
                        {/* <Typography variant="h4">{estudiante?.carrera}</Typography> */}
                      </Grid2>
                      <Grid2 item size={{ md: 6 }}>
                        <Typography variant="h6" sx={{ margin: "10px auto" }}>
                          Cédula: {pacienteElegidoParaTodo?.cedula}
                        </Typography>

                        <Typography variant="h6" sx={{ margin: "10px auto" }}>
                          Teléfono: {pacienteElegidoParaTodo?.telefonoPersona}
                        </Typography>
                        <Typography variant="h6">
                          Dirección: {pacienteElegidoParaTodo?.direccion}
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "10px auto" }}>
                          Correo: {pacienteElegidoParaTodo?.correo}
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "10px auto" }}>
                          Fecha Nacimiento:{" "}
                          {fechaLegible(
                            pacienteElegidoParaTodo?.fechaNacimiento
                          )}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to="/odontograma"
                          endIcon={<IconoOjo />}
                          state={pacienteElegidoParaTodo}
                        >
                          Ver Odontograma
                        </Button>
                      </Grid2>
                    </Grid2>
                  </CardContent>
                </Card>
              </Grid2>
            )}
            {cargandoIA ? (
              <Grid2 size={{ md: 12 }}>
                <Card>
                  <Loader />
                </Card>
              </Grid2>
            ) : (
              <Grid2 size={{ md: 12 }}>
                <Card>
                  <CardContent>
                    {gemini === "" ? (
                      <p className="mensaje">
                        Aquí podrá ver sugerencias de la IA
                      </p>
                    ) : (
                      <p className="sugerenciaIA">{gemini}</p>
                    )}
                  </CardContent>
                </Card>
              </Grid2>
            )}
            <Grid2 item size={{ md: 6 }}>
              <Card>
                <CardContent sx={{ minHeight: 400 }}>
                  <div className="centrarIconoTitulo">
                    <IconoAlergias style={{ fontSize: 100, marginRight: 20 }} />
                    <h1>Alergias</h1>
                  </div>
                  <TablaGenerica table={table} />
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => agregarInformacion(1)}
                    color="success"
                    variant="contained"
                    size="medium"
                    disabled={Object.keys(pacienteElegido).length === 0}
                  >
                    <IconoMas />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid2>
            <Grid2 item size={{ md: 6 }}>
              <Card>
                <CardContent sx={{ minHeight: 400 }}>
                  <div className="centrarIconoTitulo">
                    <IconoCorazon style={{ fontSize: 100, marginRight: 20 }} />
                    <h1>Medicamentos</h1>
                  </div>
                  <TablaGenerica table={tableMedicamentos} />
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => agregarInformacion(2)}
                    color="success"
                    variant="contained"
                    size="medium"
                    disabled={Object.keys(pacienteElegido).length === 0}
                  >
                    <IconoMas />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid2>
            <Grid2 item size={{ md: 6 }}>
              <Card>
                <CardContent sx={{ minHeight: 400 }}>
                  <div className="centrarIconoTitulo">
                    <IconoBioHazard
                      style={{ fontSize: 100, marginRight: 20 }}
                    />
                    <h1>Intervenciones Quirúrgicas</h1>
                  </div>
                  <TablaGenerica table={tableIntervenciones} />
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => agregarInformacion(3)}
                    color="success"
                    variant="contained"
                    size="medium"
                    disabled={Object.keys(pacienteElegido).length === 0}
                  >
                    <IconoMas />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid2>
            <Grid2 item size={{ md: 6 }}>
              <Card>
                <CardContent sx={{ minHeight: 400 }}>
                  <div className="centrarIconoTitulo">
                    <IconoADN style={{ fontSize: 100, marginRight: 20 }} />
                    <h1>Enfermedades Crónicas</h1>
                  </div>
                  <TablaGenerica table={tableEnfermedades} />
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => agregarInformacion(4)}
                    color="success"
                    variant="contained"
                    size="medium"
                    disabled={Object.keys(pacienteElegido).length === 0}
                  >
                    <IconoMas />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
      <DialogoEdicion
        open={open}
        handleClose={handleClose}
        queEditamos={queEditamos}
        tipoEdicion={tipoEdicion}
      />
      <DialogoCrear
        open={openCrear}
        handleClose={handleClose}
        tipoCreacion={tipoCreacion}
        paciente={pacienteElegido}
      />
      <DialogoAgregarPaciente
        open={openAgregarUsuario}
        handleClose={handleClose}
        dentista={1}
      />
    </>
  );
};

export default BuscarPaciente;
