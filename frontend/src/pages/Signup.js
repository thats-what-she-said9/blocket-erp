import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'operator',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(form);
      // On success, redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

        <label className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded p-2"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
            className="mt-1 block w-full border rounded p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Role</span>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          >
            <option value="owner">Owner</option>
            <option value="manager">Manager</option>
            <option value="operator">Operator</option>
            <option value="viewer">Viewer</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
