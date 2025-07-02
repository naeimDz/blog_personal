import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = { email: string } | null;

interface AuthContextType {
  user: User;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);  
  const [isAuthLoading, setIsAuthLoading] = useState(true);


  // Load from localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("demo-user-email");
    if (storedEmail) {
      setUser({ email: storedEmail });
    }
      setIsAuthLoading(false);
  }, []);

  const login = (email: string) => {
    localStorage.setItem("demo-user-email", email);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem("demo-user-email");
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!isAuthLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
