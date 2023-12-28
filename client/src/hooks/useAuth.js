// useAuth.js
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = Cookies.get('authToken');

      if (token) {
        try {
          const decodedToken = jwt_decode(token);

          // Check expiration
          const isTokenExpired = decodedToken.exp < Date.now() / 1000;

          if (!isTokenExpired) {
            // Token is valid, set user and authentication status
            setIsAuthenticated(true);
          }
        } catch (error) {
          // Handle decoding errors
          console.error('Error decoding JWT:', error);
        }
      }
    };

    checkAuthentication();
  }, []);


  return { isAuthenticated };
};

export default useAuth;
