import { useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { partes, procedimiento, dientes } from "../Data/data";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  IconoLapiz,
  IconoMas,
  IconoMenos,
  IconoPapelera,
} from "../Components/Iconos";
import TablaGenerica from "../Components/TablaGenerica";
import { fechaLegible } from "../Utils/funcionesUtiles";
// import "../Utils/odontograma";

const ItemDiente = ({ item, onClick, selectDiente, data, setState }) => {
  const hasSelectDiente = (parte, diente) => {
    const res = selectDiente.filter(
      (item) => item.diente === diente && item.parte === parte
    );
    if (res.length == 0) {
      return false;
      // setState((prev) =>
      //   prev.filter((item) => item.diente !== diente && item.parte !== parte)
      // );
    }
    return true;
  };
  const hasProdDiente = (parte, diente) => {
    const res = data.find(
      (item) => item.diente === diente && item.parte === parte
    );
    if (res) {
      return res;
    }
    const nulo = {};
    return nulo;
  };
  return (
    <div className="item-diente">
      <h3>{item.diente}</h3>
      <div className="base">
        {partes.map((di, i) => {
          const classstyle =
            di.codigo == 5 ? "p5 hoverParte" : "parte hoverParte p" + di.codigo;
          const infoDg = hasProdDiente(di.codigo, item.diente);
          const selected = hasSelectDiente(di.codigo, item.diente);
          const backcolor = infoDg.diente
            ? infoDg.procedimiento.color
            : selected
            ? "#4C5270"
            : "#fff";
          return (
            <div
              key={i}
              className={classstyle}
              title={infoDg?.diente ? backcolor : "Normal"}
              style={{ backgroundColor: backcolor }}
              onClick={() =>
                infoDg?.diente || selected
                  ? onClick({ parte: di.codigo, diente: item.diente })
                  : onClick({ parte: di.codigo, diente: item.diente })
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
};

const Odontograma = () => {
  const { state } = useLocation();

  const [selectDiente, setSelectDiente] = useState([]);
  const [data, setData] = useState([]);
  const [cantidad, setCantidad] = useState(0);

  const [selectProcedimiento, setSelectProcedimiento] = useState("");
  const [txtObservacion, setTxtObservacion] = useState("");

  const onClickDiente = ({ parte, diente }) => {
    const data = [...selectDiente];

    const res = selectDiente.filter(
      (item) => item.diente === diente && item.parte === parte
    );

    if (res.length > 0) {
      setSelectDiente((prev) =>
        prev.filter((item) => item.diente !== diente && item.parte !== parte)
      );
      setCantidad(cantidad - res.length);
    } else {
      data.push({ diente, parte });
      setCantidad(cantidad + 1);
      setSelectDiente(data);
    }
    console.log(cantidad);
  };

  const loadItemDiente = (num) => {
    return dientes
      .filter((item) => item.cuadro === num)
      .map((item, i) => {
        return (
          <ItemDiente
            key={i}
            item={item}
            onClick={onClickDiente}
            data={data}
            selectDiente={selectDiente}
            setState={setSelectDiente}
          />
        );
      });
  };

  const onClickAddProcedimiento = () => {
    const datos = [...data];
    const procd = procedimiento.find(
      (itemP) => itemP.id == selectProcedimiento
    );

    selectDiente.map((item) => {
      const newItem = {
        ...item,
        procedimiento: procd,
        observacion: txtObservacion,
      };
      datos.push(newItem);
    });

    setData(datos);
    setSelectProcedimiento("");
    setTxtObservacion("");
    setCantidad(0);
    setSelectDiente([]);
  };

  const eliminarDiente = (item) => {
    const resData = data.filter(
      (items) => !(items.diente == item.diente && items.parte == item.parte)
    );
    setData(resData);
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("numero", {
      cell: ({ row }) => {
        return <span>{Number(row.id) + 1}</span>;
      },
      header: () => <span>Procedimiento #</span>,
    }),
    columnHelper.accessor("diente", {
      cell: (info) => info.getValue(),
      header: () => <span>Diente</span>,
    }),
    columnHelper.accessor("parte", {
      cell: ({ row }) => {
        return (
          <span>
            {partes.find((ipt) => ipt.codigo == row.original.parte).nombre}
          </span>
        );
      },
      header: () => <span>Lado</span>,
    }),
    columnHelper.accessor("procedimiento", {
      cell: ({ row }) => {
        // console.log(row.original);
        return (
          <p className="tratamiento">
            {row.original.procedimiento.nombre}{" "}
            <span
              className="colorEnTabla"
              style={{ backgroundColor: row.original.procedimiento.color }}
            ></span>
          </p>
        );
      },
      header: () => <span>Descripción Procedimiento</span>,
    }),
    columnHelper.accessor("observacion", {
      cell: ({ row }) => {
        return <span>{row.original.observacion}</span>;
      },
      header: () => <span>Observación</span>,
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
                // onClick={() => editar(row.original, 4)}
              >
                <IconoLapiz />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                color="error"
                variant="contained"
                size="medium"
                // onClick={() => eliminar(row.original, 4)}
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
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid2 container spacing={4}>
            <Grid2 item size={{ md: 12 }}>
              <Card>
                <CardContent>
                  <Grid2 container spacing={2} sx={{ marginTop: 1 }}>
                    <Grid2 item size={{ md: 6 }}>
                      <Typography variant="h1">
                        {state?.nombres.toUpperCase()}
                      </Typography>
                      <Typography variant="h1">
                        {state?.apellidos.toUpperCase()}
                      </Typography>
                      {/* <Typography variant="h4">{estudiante?.carrera}</Typography> */}
                    </Grid2>
                    <Grid2 item size={{ md: 6 }}>
                      <Typography variant="h6" sx={{ margin: "10px auto" }}>
                        Cédula: {state?.cedula}
                      </Typography>

                      <Typography variant="h6" sx={{ margin: "10px auto" }}>
                        Teléfono: {state?.telefonoPersona}
                      </Typography>
                      <Typography variant="h6">
                        Dirección: {state?.direccion}
                      </Typography>
                      <Typography variant="h6" sx={{ margin: "10px auto" }}>
                        Correo: {state?.correo}
                      </Typography>
                      <Typography variant="h6" sx={{ margin: "10px auto" }}>
                        Fecha Nacimiento: {fechaLegible(state?.fechaNacimiento)}
                      </Typography>
                    </Grid2>
                  </Grid2>
                </CardContent>
              </Card>
            </Grid2>
            <Grid2 item size={{ md: 12 }} sx={{ marginBottom: 2 }}>
              <Card>
                <CardContent>
                  <Grid2 container spacing={4}>
                    <Grid2 item size={{ md: 8 }} sx={{ marginBottom: 2 }}>
                      <div className="card-header">
                        <h2>Odontograma</h2>
                      </div>
                      <div className="card-body row">
                        <div className="filaCuadro">
                          <div className="cuadro c1"> {loadItemDiente(1)} </div>
                          <div className="cuadro c2"> {loadItemDiente(2)} </div>
                        </div>
                        <div className="filaCuadro">
                          <div className="cuadro c3"> {loadItemDiente(3)} </div>
                          <div className="cuadro c4"> {loadItemDiente(4)} </div>
                        </div>
                      </div>
                    </Grid2>
                    <Grid2 item size={{ md: 4 }} sx={{ marginBottom: 2 }}>
                      <div className="card-header">Adicionar</div>
                      <div className="card-body row">
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                          <InputLabel id="demo-simple-select-label">
                            Procedimiento
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectProcedimiento}
                            label="Procedimiento"
                            onChange={(event) =>
                              setSelectProcedimiento(event.target.value)
                            }
                          >
                            {procedimiento.map((item) => {
                              return (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.nombre}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>

                        <TextField
                          id="obs"
                          multiline
                          rows={4}
                          value={txtObservacion}
                          placeholder="Observación"
                          fullWidth
                          sx={{ marginTop: 2 }}
                          onChange={(event) =>
                            setTxtObservacion(event.target.value)
                          }
                        />

                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => onClickAddProcedimiento()}
                          sx={{ marginTop: 2, marginRight: 2 }}
                          endIcon={<IconoMenos />}
                          disabled={cantidad === 0}
                        >
                          Quitar Selección
                        </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => onClickAddProcedimiento()}
                          sx={{ marginTop: 2 }}
                          endIcon={<IconoMas />}
                          disabled={cantidad === 0}
                        >
                          Agregar
                        </Button>
                      </div>
                    </Grid2>
                  </Grid2>
                  <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                  <Grid2 item size={{ md: 12 }} sx={{ marginBottom: 2 }}>
                    <TablaGenerica table={table} />
                  </Grid2>
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </>
  );
};

export default Odontograma;
