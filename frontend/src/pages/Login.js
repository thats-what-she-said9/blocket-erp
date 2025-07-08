import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <p className="text-gray-600 mb-4">
          Login form will be implemented here.
        </p>
        <Link to="/signup" className="text-blue-600 hover:underline">
          Go to Signup
        </Link>
      </div>
    </div>
  );
}
