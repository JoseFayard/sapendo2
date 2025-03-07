import React from "react";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState({});
  const [persist, setPersist] = React.useState(
    JSON.parse(localStorage.getItem("persist") === undefined ? false : true)
  );

  // // console.log(
  //   typeof localStorage["persist"] === "undefined"
  //     ? false
  //     : localStorage["persist"]
  // );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
