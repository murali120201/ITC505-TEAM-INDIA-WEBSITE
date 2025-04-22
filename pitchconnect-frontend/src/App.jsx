import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';
import AuthChoice from './AuthChoice';
import Dashboard from './Dashboard';
import UploadPitch from './UploadPitch';
import MyPitches from './mypitches.jsx';
import Startups from './Startups';
import PrivateRoute from './privateroute.jsx';


function AppRoutes() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/choose', '/login', '/register'];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/choose" element={<AuthChoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadPitch />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypitches"
          element={
            <PrivateRoute>
              <MyPitches />
            </PrivateRoute>
          }
        />
        <Route
          path="/startups"
          element={
            <PrivateRoute>
              <Startups />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
