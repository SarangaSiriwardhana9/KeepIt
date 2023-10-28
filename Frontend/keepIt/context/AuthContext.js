import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null); // New state for the user's name
  const [userId, setUserId] = useState(null); // New state for the MongoDB _id
  const [userProvince, setUserProvince] = useState(null); // New state for the user's province
  const [profileCompletion, setUserProfileCompletion] = useState(null); // New state for the user's profile completion

  const login = (userData) => {
    setUser(userData);
    setUserName(userData.fullName); // Set the user's name when logging in
    setUserId(userData._id); 
    setUserProvince(userData.province); 
    setUserProfileCompletion(userData.profileCompletion);
  };

  const logout = () => {
    setUser(null);
    setUserName(null); // Clear the user's name on logout
    setUserId(null); // Clear the MongoDB _id on logout
    setUserProvince(null); // Clear the user's province on logout
    setUserProfileCompletion(null); // Clear the user's profile completion on logout
  };

  return (
    <AuthContext.Provider value={{ user, userName, userId,userProvince,profileCompletion, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
