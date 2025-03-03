import { FiPlusCircle, FiSearch } from "react-icons/fi";
import { FcBiohazard, FcBiomass, FcBiotech, FcLike } from "react-icons/fc";

export const IconoBusqueda = (props) => {
  return <FiSearch {...props} />;
};
export const IconoMas = (props) => {
  return <FiPlusCircle {...props} />;
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
