import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Login';
import ImagensUsuario from './ImagensUsuario';
import FotoDetalhe from './FotoDetalhe';
import Upload from './Upload';
import Logout from './Logout';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

const Layout = ({ children }) => (
  <div>
    <header style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '1rem' }}>
      <Logout />
    </header>
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
      {children}
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/photos" element={<RequireAuth><Layout><ImagensUsuario /></Layout></RequireAuth>} />
        <Route path="/photos/:id" element={<RequireAuth><Layout><FotoDetalhe /></Layout></RequireAuth>} />
        <Route path="/upload" element={<RequireAuth><Layout><Upload /></Layout></RequireAuth>} />
        {/* Redirecione a rota raiz para /login ou outra página inicial, se preferir */}
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
