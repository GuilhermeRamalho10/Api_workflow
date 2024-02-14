// FotoDetalhe.js
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const FotoDetalhe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { fotoId } = useParams(); // Certifique-se que a rota é "/foto/:fotoId"
  const [fotoDetalhe, setFotoDetalhe] = useState(null);

  useEffect(() => {
    const buscarDetalhesFoto = async () => {
      try {
        const url = `http://127.0.0.1:8000/photos/${fotoId}?token=${token}`;
        const resposta = await fetch(url);
        if (!resposta.ok) {
          throw new Error('Erro ao buscar detalhes da foto');
        }
        const dados = await resposta.json();
        setFotoDetalhe(dados);
      } catch (erro) {
        console.error(erro);
      }
    };

    if (fotoId && token) {
      buscarDetalhesFoto();
    }
  }, [fotoId, token]);

  return (
    <div>
      {fotoDetalhe ? (
        <div>
          <img src={fotoDetalhe.url} alt={fotoDetalhe.titulo} />
          <h2>{fotoDetalhe.titulo}</h2>
          {/* Outros detalhes da foto que você queira mostrar */}
        </div>
      ) : (
        <p>Não foi possível encontrar os detalhes da foto.</p>
      )}
    </div>
  );
};

export default FotoDetalhe;
