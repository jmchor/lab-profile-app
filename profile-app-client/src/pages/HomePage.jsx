import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>

      <Link to="/signup">
        <button>Signup</button>
      </Link>

      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default HomePage;
