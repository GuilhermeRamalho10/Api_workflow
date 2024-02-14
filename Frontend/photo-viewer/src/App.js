import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ImagensUsuario from './ImagensUsuario';
import FotoDetalhe from './FotoDetalhe';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/photos" element={<ImagensUsuario />} />
          <Route path="/photos/:id" element={<FotoDetalhe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
