import { useContext } from 'react';
import AuthContext from './context/AuthContext';

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="App">
      <h1>Blocket ERP</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <p>Role: {user.role}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in</p>
          {/* Login form will go here */}
        </div>
      )}
    </div>
  );
}

export default App;
