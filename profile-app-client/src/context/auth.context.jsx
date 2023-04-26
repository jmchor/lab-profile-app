import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

const AuthContext = React.createContext();

const AuthProviderWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          const user = res.data;
          setUser(user);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsLoggedIn(false);
          setUser(null);
        });
    } else {
      setIsLoading(false);
      setIsLoggedIn(false);
      setUser(null);
    }
  };
  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProviderWrapper, AuthContext };
