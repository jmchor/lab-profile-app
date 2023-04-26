import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const loginData = { username, password };

    axios
      .post(`${API_URL}/auth/login`, loginData)
      .then((response) => {
        console.log('JWT token', response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <div className="form-group p-2 ">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary">Login</button>

          <p>
            Don't have an account yet?
            <Link to="/signup">Signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
