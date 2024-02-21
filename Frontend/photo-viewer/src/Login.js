import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário já está logado
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/photos'); // Redireciona para '/photos' se já estiver logado
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginUrl = 'http://localhost:8000/login/';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Falha no login');
      }

      localStorage.setItem('authToken', data.token);
      navigate('/photos'); // Redireciona após o sucesso do login
    } catch (error) {
      setError(error.message);
      console.error('Erro ao fazer login:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuário:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
