import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { LocalStorageAuthRepository } from '../../infrastructure/LocalStorageAuthRepository';
import { LoginUseCase } from '../../application/LoginUseCase';
import { LogoutUseCase } from '../../application/LogoutUseCase';
import { CheckAuthUseCase } from '../../application/CheckAuthUseCase';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, pass: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Instanciamos los casos de uso para el contexto global
const repository = new LocalStorageAuthRepository();
const loginUseCase = new LoginUseCase(repository);
const logoutUseCase = new LogoutUseCase(repository);
const checkAuthUseCase = new CheckAuthUseCase(repository);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Verificar si ya hay una sesión activa al cargar
    setIsAuthenticated(checkAuthUseCase.execute());
    setLoading(false);
  }, []);

  const login = async (username: string, pass: string) => {
    await loginUseCase.execute(username, pass);
    setIsAuthenticated(true);
  };

  const logout = () => {
    logoutUseCase.execute();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
