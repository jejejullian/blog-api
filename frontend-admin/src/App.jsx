import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NewPostPage from './pages/NewPostPage';
import EditPostPage from './pages/EditPostPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/posts/new" element={<NewPostPage />} />
              <Route path="/posts/:id/edit" element={<EditPostPage />} />
            </Route>
          </Routes>
        </main>
        
        {/* Global technical decoration */}
        <div className="fixed bottom-4 right-4 pointer-events-none opacity-20 hidden lg:block">
          <div className="text-[10px] font-mono text-primary text-right">
            ADMIN_SYS_V4.0<br />
            KRYPTON_ENGINE_ACTIVE<br />
            {new Date().toISOString()}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
