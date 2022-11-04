import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// const useAuth = () => {
//   const user = { loggedIn: true };
//   return user && user.loggedIn;
// };

const PublicRoutes = ({ isAuth }) => {
  //   const isAuth = useAuth();
  return isAuth ? <Navigate to='admin/dashboard' /> : <Outlet />;
};

export default PublicRoutes;
