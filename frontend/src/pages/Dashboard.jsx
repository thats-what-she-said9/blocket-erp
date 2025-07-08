import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.email}</h1>
      <p className="mb-4">
        Your role: <strong>{user?.role}</strong>
      </p>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Log Out
      </button>
    </div>
  );
}
