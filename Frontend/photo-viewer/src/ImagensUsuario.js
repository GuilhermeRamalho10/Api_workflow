import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImagensUsuario = ({ token }) => {
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    const fetchImagens = async () => {
      try {
        // Atualizado para apontar para localhost
        const response = await axios.get(`http://localhost:8000/photos/?token=${token}`);
        setImagens(response.data);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchImagens();
  }, [token]);

  return (
    <div>
      {imagens.map(imagem => (
        <div key={imagem.id}>
          <img src={imagem.url} alt={imagem.titulo} />
          <p>{imagem.titulo}</p>
        </div>
      ))}
    </div>
  );
};

export default ImagensUsuario;
