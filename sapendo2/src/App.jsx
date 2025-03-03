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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/buscar-paciente" element={<BuscarPaciente />} />
      </Route>
    )
  );

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#818589",
      },
      secondary: {
        main: "#edeade",
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
