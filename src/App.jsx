import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import AuthorPage from './pages/AuthorPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import LoginPage from './pages/LoginPage';
import SubmitArticlePage from './pages/SubmitArticlePage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function ScrollToTop() {
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-white dark:bg-black transition-colors">
            <Routes>
              {/* Login Page */}
              <Route path="/login" element={<LoginPage />} />

              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="submissions" element={<AdminSubmissions />} />
                <Route path="settings" element={<div className="text-center py-20 text-slate-400 font-outfit uppercase text-[10px] tracking-widest">Settings coming soon...</div>} />
              </Route>

              {/* Main Site Routes */}
              <Route path="*" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/post/:slug" element={<ArticlePage />} />
                      <Route path="/submit" element={
                        <ProtectedRoute>
                          <SubmitArticlePage />
                        </ProtectedRoute>
                      } />
                      <Route path="/categories" element={<CategoriesPage />} />
                      <Route path="/categories/:id" element={<CategoryPage />} />
                      <Route path="/author/:id" element={<AuthorPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="*" element={
                        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                          <p className="text-7xl mb-4">404</p>
                          <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Page Not Found</h1>
                          <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
                          <a href="/" className="px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-black rounded-sm font-bold uppercase text-[10px] tracking-widest transition-all inline-block">Go Home</a>
                        </div>
                      } />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
