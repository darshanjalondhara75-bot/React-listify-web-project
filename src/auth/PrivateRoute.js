import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../actions/auth';

const PrivateRoute = ({ children }) => {
  const user = isAuthenticated().user;
  const token = isAuthenticated().token;

  return user && token ? children : <Navigate to='/login' />;
};

export default PrivateRoute;

