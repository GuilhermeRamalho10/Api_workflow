import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ImagensUsuario from './ImagensUsuario';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/photos" element={<ImagensUsuario />} />
          <Route path="/foto-title" element={<FotoDetalhe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
