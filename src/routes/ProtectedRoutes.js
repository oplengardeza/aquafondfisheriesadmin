import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// const useAuth = () => {
//   const user = { loggedIn: true };
//   return user && user.loggedIn;
// };

const ProtectedRoutes = ({ isAuth }) => {
  // const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to='admin/login' />;
};

export default ProtectedRoutes;
