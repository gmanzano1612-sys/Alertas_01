import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Modulo01 from './components/Modulo01';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundNodes from './components/BackgroundNodes';
import './index.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState(null); // Estado para guardar los datos de PostgreSQL
  
  const [currentView, setCurrentView] = useState(() => {
    return window.location.pathname === '/modulo01' ? 'modulo01' : 'dashboard';
  });

  // Cargar datos del usuario desde la base de datos usando el Token
  useEffect(() => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/dashboard/', {
        headers: { Authorization: `Token ${token}` }
      })
      .then(response => {
        setUserData(response.data); // Guardamos username, email, etc.
      })
      .catch(err => {
        console.error("Error al obtener datos del usuario:", err);
        if (err.response && err.response.status === 401) {
          handleLogout();
        }
      });
    }
  }, [token]);

  const navigateTo = (view) => {
    const path = view === 'modulo01' ? '/modulo01' : '/';
    window.history.pushState({}, '', path);
    setCurrentView(view);
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/modulo01') {
        setCurrentView('modulo01');
      } else {
        setCurrentView('dashboard');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUserData(null);
    window.history.pushState({}, '', '/');
    setCurrentView('dashboard');
  };

  if (!token) {
    return (
      <Login 
        setToken={(newToken) => {
          localStorage.setItem('token', newToken);
          setToken(newToken);
          navigateTo('dashboard');
        }} 
      />
    );
  }

  return (
    <div className="relative w-screen h-screen flex bg-[#f8f9fa] overflow-hidden font-sans">
      <BackgroundNodes />

      <Sidebar 
        collapsed={collapsed} 
        currentView={currentView} 
        onNavigate={navigateTo} 
      />

      <div className="relative z-10 flex-1 flex flex-col h-screen overflow-y-auto">
        <Header 
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          currentView={currentView} 
          handleLogout={handleLogout}
          onNavigate={navigateTo}
          userData={userData}
        />

        <main className="flex-1 p-8">
          {currentView === 'dashboard' && (
            <Dashboard onNavigate={navigateTo} userData={userData} />
          )}

          {currentView === 'modulo01' && (
            <Modulo01 
              token={token}
              onBack={() => navigateTo('dashboard')} 
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;