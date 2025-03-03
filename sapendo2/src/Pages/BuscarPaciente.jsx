import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import {
  IconoADN,
  IconoAlergias,
  IconoBioHazard,
  IconoBusqueda,
  IconoCorazon,
  IconoMas,
} from "../Components/Iconos";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../API/axios";

import {
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

const BuscarPaciente = () => {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteElegido, setPacienteElegido] = useState({});
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [cargando, setCargando] = useState(true);
  const [alergias, setAlergias] = useState([]);
  const [data, setData] = useState(() => []);

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
      setCargando(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPacientes();
  }, []);

  const buscarPaciente = async () => {
    let paciente = pacientes.filter((item) => item?.id === value?.id);
    let pacienteID = paciente[0]?.id;

    setPacienteElegido(paciente);

    try {
      let res = await axiosPrivate
        .get(`${OBTNER_ALERGIAS_CONOCIDAS}/${pacienteID}`)
        .then(({ data }) => data);
      setData(res);
    } catch (e) {
      console.error(e);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("nombreAlergia", {
      cell: (info) => info.getValue(),
      header: () => <span>Alergia</span>,
    }),
    columnHelper.accessor("estatus", {
      cell: (info) => info.getValue(),
      header: () => <span>Estatus</span>,
    }),
    columnHelper.accessor("fecha", {
      cell: (info) => fechaLegible(info.getValue()),
      header: () => <span>Fecha</span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
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
                >
                  Crear Paciente
                </Button>
              </div>
              {/* </CardContent> */}
              {/* </Card> */}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <CardContent sx={{ minHeight: 400 }}>
                  <div className="centrarIconoTitulo">
                    <IconoAlergias style={{ fontSize: 100, marginRight: 20 }} />
                    <h1>Alergias</h1>
                  </div>
                  <TablaGenerica table={table} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <CardContent sx={{ minHeight: 400 }}>
                  <div className="centrarIconoTitulo">
                    <IconoCorazon style={{ fontSize: 100, marginRight: 20 }} />
                    <h1>Medicamentos</h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <CardContent sx={{ minHeight: 400 }}>
                  <div className="centrarIconoTitulo">
                    <IconoBioHazard
                      style={{ fontSize: 100, marginRight: 20 }}
                    />
                    <h1>Intervenciones Quirúrgicas</h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <CardContent sx={{ minHeight: 400 }}>
                  <div className="centrarIconoTitulo">
                    <IconoADN style={{ fontSize: 100, marginRight: 20 }} />
                    <h1>Enfermedades Crónicas</h1>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default BuscarPaciente;
