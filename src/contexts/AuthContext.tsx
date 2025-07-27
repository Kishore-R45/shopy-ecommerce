import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'customer' | 'vendor';

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: UserRole;
  shopName?: string;
  shopAddress?: string;
  shopImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (mobile: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('shopy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (mobile: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const mockUsers = JSON.parse(localStorage.getItem('shopy_users') || '[]');
    const foundUser = mockUsers.find((u: any) => u.mobile === mobile && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('shopy_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    // Mock signup - in real app, this would call an API
    const mockUsers = JSON.parse(localStorage.getItem('shopy_users') || '[]');
    const userExists = mockUsers.find((u: any) => u.mobile === userData.mobile);
    
    if (userExists) {
      return false;
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
    };

    mockUsers.push(newUser);
    localStorage.setItem('shopy_users', JSON.stringify(mockUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('shopy_user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopy_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};