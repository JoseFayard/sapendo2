import { FcBiohazard, FcBiomass, FcBiotech, FcLike } from "react-icons/fc";
import {
  Brain,
  CircleMinus,
  CirclePlus,
  Eye,
  Pencil,
  Save,
  Search,
  Trash,
} from "lucide-react";

export const IconoBusqueda = (props) => {
  return <Search {...props} />;
};
export const IconoMas = (props) => {
  return <CirclePlus {...props} />;
};

export const IconoMenos = (props) => {
  return <CircleMinus {...props} />;
};

export const IconoAlergias = (props) => {
  return <FcBiomass {...props} />;
};

export const IconoADN = (props) => {
  return <FcBiotech {...props} />;
};

export const IconoCorazon = (props) => {
  return <FcLike {...props} />;
};

export const IconoBioHazard = (props) => {
  return <FcBiohazard {...props} />;
};

export const IconoPapelera = (props) => {
  return <Trash {...props} />;
};

export const IconoLapiz = (props) => {
  return <Pencil {...props} />;
};

export const IconoGuardar = (props) => {
  return <Save {...props} />;
};

export const IconoOjo = (props) => {
  return <Eye {...props} />;
};

export const IconoCerebro = (props) => {
  return <Brain {...props} />;
};
