import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';

const OwnerRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return user && (user.role === 'owner' || user.role === 'admin') ? 
    children : 
    <Navigate to="/dashboard" />;
};

export default OwnerRoute;