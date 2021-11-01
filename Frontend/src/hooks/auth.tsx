import React, { createContext, useState, useCallback, useContext } from 'react';
import { User, UserCredentialsSignIn, UserCredentialsSignUp } from '../interfaces';

import api from '../services/api';
import { useSignalR } from './signalRHub';

interface UsersContextData {
  user: User;
  signIn(credentials: UserCredentialsSignIn): Promise<boolean>;
  signUp(credentials: UserCredentialsSignUp): Promise<boolean>;
  signOut(): void;
}

const AuthContext = createContext({} as UsersContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const token = localStorage.getItem('@IChat:token');
    const user = localStorage.getItem('@IChat:user');

    if (token && user) {
      return { ...JSON.parse(user) };
    }

    return {} as User;
  });
  
  const { disconnect } = useSignalR();

  const signUp = useCallback(async (credentials: UserCredentialsSignUp): Promise<boolean> => {
    var response = await api.post("users", {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password
    });

    if (response.status !== 201) 
      return false;

    return true;
  }, []);

  const signIn = useCallback(async (credentials: UserCredentialsSignIn): Promise<boolean> => {
    var response = await api.post("users/sessions", {
      email: credentials.email,
      password: credentials.password
    });

    if (response.status !== 201) 
      return false;

    var { data: user } = response.data;

    localStorage.setItem("@IChat:token", JSON.stringify(user.token));
    localStorage.setItem("@IChat:user", JSON.stringify(user));

    setUser(user);
    return true;
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@IChat:token');
    localStorage.removeItem('@IChat:user');
    
    setUser({} as User);

    await disconnect();
  }, [disconnect]);

  
  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): UsersContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };