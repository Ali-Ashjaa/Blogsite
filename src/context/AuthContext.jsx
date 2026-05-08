import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('wordweaver_user');
    const allUsers = localStorage.getItem('wordweaver_all_users');
    
    if (!allUsers) {
      // Initialize with default admin
      const initialUsers = [{ id: 1, name: 'Admin', email: 'admin@wordweaver.com', password: 'admin123', role: 'admin' }];
      localStorage.setItem('wordweaver_all_users', JSON.stringify(initialUsers));
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const allUsers = JSON.parse(localStorage.getItem('wordweaver_all_users') || '[]');
    const foundUser = allUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userData } = foundUser; // Remove password from state
      setUser(userData);
      localStorage.setItem('wordweaver_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    const allUsers = JSON.parse(localStorage.getItem('wordweaver_all_users') || '[]');
    
    if (allUsers.some(u => u.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user'
    };

    allUsers.push(newUser);
    localStorage.setItem('wordweaver_all_users', JSON.stringify(allUsers));
    
    const { password: p, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem('wordweaver_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wordweaver_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
