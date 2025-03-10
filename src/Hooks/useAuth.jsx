import React from "react";
import AuthContext from "../Context/AuthProvider";

const useAuth = () => {
  return React.useContext(AuthContext);
};

export default useAuth;
