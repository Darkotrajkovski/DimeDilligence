import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const [authUser, setAuthUser] = useState<string>();
  const [userId, setUserId] = useState<number>();
  const [token, setToken] = useState<string>();

  const value = {
    authUser,
    setAuthUser,
    userId,
    setUserId,
    token,
    setToken
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}