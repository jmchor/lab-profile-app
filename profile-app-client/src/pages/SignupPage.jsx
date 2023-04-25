import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [campus, setCampus] = useState('');
  const [course, setCourse] = useState('');

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    const signupData = { username, password, campus, course };

    axios
      .post(`${API_URL}/auth/signup`, signupData)
      .then((res) => {
        console.log(res);
        navigate('/login');
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <form onSubmit={handleSignupSubmit}>
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
        </div>
        <div className="form-group p-2">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="campus">Campus</label>
          <select
            className="form-control"
            name="campus"
            id="campus"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
          >
            <option value="">Select a campus</option>
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Miami">Miami</option>
            <option value="Paris">Paris</option>
            <option value="Berlin">Berlin</option>
            <option value="Amsterdam">Amsterdam</option>
            <option value="México">Mexico</option>
            <option value="Sao Paulo">Sao Paulo</option>
            <option value="Lisbon">Lisbon</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="form-group p-2">
          <label htmlFor="course">Course</label>
          <select
            className="form-control"
            name="course"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">Select a course</option>
            <option value="Web Dev">Web Dev</option>
            <option value="UX/UI">UX/UI</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>
        </div>
        <button className="btn btn-primary p-2" type="submit">
          Signup
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account?</p>

      <Link to="/login"> Login </Link>
    </div>
  );
};

export default SignupPage;
