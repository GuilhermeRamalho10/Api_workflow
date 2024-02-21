// LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove o token do localStorage
    navigate('/login'); // Redireciona o usuário para a página de login
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
