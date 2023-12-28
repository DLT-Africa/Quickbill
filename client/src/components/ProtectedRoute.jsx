import React from 'react';
import {  Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Home from './Home';
import Login from './Login';

const ProtectedRoute = ({ path, element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};
