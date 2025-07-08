import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          {user ? (
            <div>
              <p className="text-lg mb-2">Welcome, {user.email}!</p>
              <p className="text-gray-600">Role: {user.role}</p>
            </div>
          ) : (
            <p className="text-gray-600">Loading user data...</p>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Dashboard Content</h2>
            <p className="text-gray-600">
              This is where your main application content will go.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
