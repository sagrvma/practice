import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
  name: string;
};

export type AuthContextType = {
  user: User | null;
  login(name: string): void;
  logout(): void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string) => {
    const newUser: User | null = {
      name: name,
    };

    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context: AuthContextType | undefined = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
