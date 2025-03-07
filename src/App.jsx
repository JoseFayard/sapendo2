import { Suspense } from "react";
import Layout from "./Components/Layout";
import { createTheme } from "@mui/material/styles";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { ThemeProvider } from "@emotion/react";
import InicioSesion from "./Pages/InicioSesion";
import "./App.css";
import BuscarPaciente from "./Pages/BuscarPaciente";
import Odontograma from "./Pages/Odontograma";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/buscar-paciente" element={<BuscarPaciente />} />
        <Route path="/odontograma" element={<Odontograma />} />
      </Route>
    )
  );

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#002a3a",
      },
      secondary: {
        main: "#e4e1d6",
      },
      success: {
        main: "#30a489",
      },
      error: {
        main: "#dd614a",
      },
      info: {
        main: "#9fd8cb",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>cargando...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
