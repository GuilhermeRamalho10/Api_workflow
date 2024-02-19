import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';

const PhotoDetailPage = () => {
  const [photo, setPhoto] = useState(null);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const result = await axios(`http://3.253.249.205:8080/photos/${id}/?token=${token}`);
        setPhoto(result.data);
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    if (token) fetchPhoto();
  }, [id, token]);

  if (!photo) return <div>Loading...</div>;

  return (
    <div>
      <img src={photo.image} alt={photo.title} style={{ width: '300px', height: '300px' }} />
      <p>{photo.title}</p>
    </div>
  );
};

export default PhotoDetailPage;
