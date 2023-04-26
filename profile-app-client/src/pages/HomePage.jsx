import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Home Page</h1>

      <Link to="/signup">
        <button>Signup</button>
      </Link>

      <Link to="/login">
        <button>Login</button>
      </Link>

      {user && (
        <div>
          <h2>Welcome {user.username}</h2>
          <Link to="/profile">
            <button>Go to profile</button>
          </Link>

          <Link to="/edit-profile">
            <button>Edit profile</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
