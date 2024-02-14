// ImagensUsuario.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ImagensUsuario = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    // Função para buscar as fotos do usuário com o token
    const buscarFotos = async () => {
      try {
        const resposta = await fetch(`http://127.0.0.1:8000/photos/?token=${token}`);
        if (!resposta.ok) {
          throw new Error('Erro ao buscar fotos');
        }
        const fotos = await resposta.json();
        setFotos(fotos);
      } catch (erro) {
        console.error(erro);
      }
    };

    if (token) {
      buscarFotos();
    }
  }, [token]);

  return (
    <div>
      {fotos.length > 0 ? (
        fotos.map((foto) => (
          <div key={foto.id}>
            <img src={foto.url} alt={foto.titulo} />
            <p>{foto.titulo}</p>
          </div>
        ))
      ) : (
        <p>Não foram encontradas fotos.</p>
      )}
    </div>
  );
};

export default ImagensUsuario;
