import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Por favor, selecione um arquivo para fazer o upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title); // Adiciona o título ao formData, se necessário

    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://127.0.0.1:8000/photos/?token=' + token, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload realizado com sucesso!');
      navigate('/photos'); // Redireciona para /photos
    } catch (error) {
      console.error('Erro ao fazer o upload:', error);
      alert('Erro ao fazer o upload.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="file">Imagem:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
