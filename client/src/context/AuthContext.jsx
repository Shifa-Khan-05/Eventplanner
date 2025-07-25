import { useEffect } from "react";
import { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {});
  const value = {
    user,
    isLogin,
    isAdmin,
    setIsAdmin,
    setIsLogin,
    setUser,

  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
};
