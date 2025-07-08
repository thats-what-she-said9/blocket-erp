import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render the protected component
  return children;
}
