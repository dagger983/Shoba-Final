import React from 'react';
import MainContent from './MainContent';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }

  return <MainContent />;
};

export default AdminDashboard;
