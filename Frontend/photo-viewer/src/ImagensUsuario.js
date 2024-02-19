import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const result = await axios(`http://3.253.249.205:8080/photos/?token=${token}`);
        setPhotos(result.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    if (token) fetchPhotos();
  }, [token]);

  return (
    <div>
      
      {photos.map(photo => (
        <div key={photo.id}>
          <Link to={`/photos/${photo.id}?token=${token}`}>
          <img src={photo.image} alt={photo.title} style={{ width: '100px', height: '100px' }} />
          </Link>
          <p>{photo.title}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotosPage;
