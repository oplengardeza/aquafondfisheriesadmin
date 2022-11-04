import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./utils/firebase";
import { theme } from "./utils/theme";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "././routes/ProtectedRoutes";
import PublicRoutes from "././routes/PublicRoutes";
import NotFound from "./pages/NotFound";
import MainDashboard from "./pages/dashboardRoutes/MainDashboard";
import Users from "./pages/dashboardRoutes/Users";
import Shops from "./pages/dashboardRoutes/Shops";
import SingleView from "./pages/dashboardRoutes/singleViews/SingleView";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // dispatch(getUserId())
      if (authUser) {
        setIsLoading(false);
        setIsAuthenticated(true);
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    });
    return () => {
      setIsAuthenticated(false);
      setIsLoading(true);
    };
  }, []);
  if (isLoading === true) {
    return <Typography variant='h1'>LOADING...</Typography>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path='/'
            element={
              <Navigate
                to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              />
            }
          />
          <Route element={<PublicRoutes isAuth={isAuthenticated} />}>
            <Route path='admin/login' element={<AdminLogin />} />
          </Route>
          <Route element={<ProtectedRoutes isAuth={isAuthenticated} />}>
            <Route path='admin' element={<Dashboard />}>
              <Route path='dashboard' element={<MainDashboard />} >
                <Route path='view/:id' element={<SingleView />} />
              </Route>
              <Route path='users-info' element={<Users />} />
              <Route path='shop-info' element={<Shops />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    );
  }
}

export default App;
