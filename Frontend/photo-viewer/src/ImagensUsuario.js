import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const token = localStorage.getItem('authToken'); // Obter o token do localStorage
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const result = await axios.get(`https://www.guilhermeawstest.it:8443/photos/`, {
          headers: { 
            // Se o backend espera o token na URL, mantenha a linha abaixo
            // Caso contrário, se o backend espera o token no cabeçalho Authorization, use a linha comentada abaixo
             Authorization: `Token ${token}`
          },
          params: { token } // Remova esta linha se o backend espera o token no cabeçalho Authorization
        });
        setPhotos(result.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []); // Removido o token dos deps de useEffect porque o valor é lido do localStorage agora

  return (
    <div>
      {photos.map(photo => (
        <div key={photo.id}>
          <Link to={`/photos/${photo.id}`}>
            <img src={photo.image} alt={photo.title} style={{ width: '100px', height: '100px' }} />
          </Link>
          <p>{photo.title}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotosPage;
