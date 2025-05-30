import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginManagerContext = createContext();

export const useLoginManager = () => useContext(LoginManagerContext);

export const LoginManagerProvider = ({ children }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  // const [onLoginSuccessCallback, setOnLoginSuccessCallback] = useState(null);

  useEffect(() => {
    const onTokenExpired = () => {
      console.log('[LoginManager] Token expired, showing login modal.');
      setLoginModalVisible(true);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    };
    window.addEventListener('token-expired', onTokenExpired);
    return () => window.removeEventListener('token-expired', onTokenExpired);
  }, []);

  const showLoginModal = () => {
    setLoginModalVisible(true);
  };

  const hideLoginModal = () => {
    setLoginModalVisible(false);
  };

  return (
    <LoginManagerContext.Provider value={{ loginModalVisible, showLoginModal, hideLoginModal }}>
      {children}
    </LoginManagerContext.Provider>
  );
};
