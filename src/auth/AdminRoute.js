import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../actions/auth';

const AdminRoute = ({ children }) => {
  const user = isAuthenticated().user;

  return isAuthenticated() && user.role === 'admin' ? (
    children
  ) : (
    <Navigate to='/user/dashboard' />
  );
};

export default AdminRoute;

