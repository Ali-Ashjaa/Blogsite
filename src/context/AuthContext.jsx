import { createContext, useContext, useState, useEffect } from 'react';
import { usersDB, sessionDB, postsDB } from '../lib/db';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize default admin if no users exist
    usersDB.init();
    // Initialize posts if none exist
    postsDB.init();

    // Restore session
    const storedUser = sessionDB.get();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();
    const found = usersDB.findByEmail(cleanEmail);
    
    if (found && found.password === cleanPassword) {
      const { password: _p, ...userData } = found;
      setUser(userData);
      sessionDB.set(userData);
      return { success: true, user: userData };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const signup = (name, email, password) => {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      return { success: false, message: 'All fields are required.' };
    }
    if (cleanPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }
    if (usersDB.findByEmail(cleanEmail)) {
      return { success: false, message: 'This email is already registered.' };
    }

    const newUser = {
      id: Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    usersDB.add(newUser);

    const { password: _p, ...userData } = newUser;
    setUser(userData);
    sessionDB.set(userData);
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    sessionDB.clear();
  };

  const updateUser = (changes) => {
    const updated = { ...user, ...changes };
    setUser(updated);
    sessionDB.set(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
