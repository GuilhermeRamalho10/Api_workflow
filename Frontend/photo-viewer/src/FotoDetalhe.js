import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PhotoDetailPage = () => {
  const [photo, setPhoto] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPhoto = async () => {
      const token = localStorage.getItem('authToken');
      console.log("Token:", token);
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        // Inclui o token na query string da URL
        const result = await axios.get(`https://www.guilhermeawstest.it:8443/photos/${id}/?token=${token}`);
        setPhoto(result.data);
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    fetchPhoto();
  }, [id]);

  if (!photo) return <div>Loading...</div>;

  return (
    <div>
      <img src={photo.image} alt={photo.title} style={{ width: '300px', height: '300px' }} />
      <p>{photo.title}</p>
    </div>
  );
};

export default PhotoDetailPage;
