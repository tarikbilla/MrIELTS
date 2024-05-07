// D:\mrielts\ProjectCode\mrielts\contexts\UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { apiUrl } from '../config';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Example: Fetch user data on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await fetch(`${apiUrl}/api/users/me`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else if (response.status === 403) {
            console.error('Access denied. Invalid token or expired:', response.status);
            // Handle token expiration or invalid token
          } else {
            console.error('Failed to fetch user information:', response.status);
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching user information', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};
