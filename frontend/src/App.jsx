import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { ShieldAlert, Clock, LogOut, RefreshCw } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Modulo01 from './components/Modulo01';
import Modulo02 from './components/Modulo02';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundNodes from './components/BackgroundNodes';
import './index.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showInactivityModal, setShowInactivityModal] = useState(false);

  const warningTimerRef = useRef(null);
  const logoutTimerRef = useRef(null);

  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname.replace('/', '');
    return path || 'dashboard';
  });

  // Función robusta para cerrar sesión y forzar el estado de Login
  const handleLogout = useCallback(() => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    localStorage.removeItem('token');
    setUserData(null);
    setShowInactivityModal(false);
    window.history.pushState({}, '', '/');
    setCurrentView('dashboard');
    setToken(''); // Al colocar el token al final, forzamos el renderizado inmediato del Login
  }, []);

  const resetInactivityTimers = useCallback(() => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    // --- CONFIGURACIÓN DE TIEMPOS (10s totales para pruebas: 8s advertencia, 2s cierre) ---
    const TOTAL_INACTIVITY_TIME = 20 * 60 * 1000; 
    const WARNING_TIME = TOTAL_INACTIVITY_TIME * 0.8; 
    const REMAINING_TIME = TOTAL_INACTIVITY_TIME - WARNING_TIME; 

    // 1. Temporizador para mostrar la advertencia al 80%
    warningTimerRef.current = setTimeout(() => {
      setShowInactivityModal(true);

      // 2. Temporizador independiente para cerrar sesión si se agota el 20% restante
      logoutTimerRef.current = setTimeout(() => {
        handleLogout();
      }, REMAINING_TIME);

    }, WARNING_TIME);
  }, [handleLogout]);

  // Escuchar eventos de interacción del usuario
  useEffect(() => {
    if (!token) return;

    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    
    const handleUserActivity = () => {
      // Si el modal ya está abierto, ignoramos el movimiento para que el usuario decida manualmente o expire solo
      if (!showInactivityModal) {
        resetInactivityTimers();
      }
    };

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    resetInactivityTimers();

    return () => {
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [token, showInactivityModal, resetInactivityTimers]);

  // Botón para extender la sesión desde el modal
  const extendSession = () => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    setShowInactivityModal(false);
    resetInactivityTimers();
  };

  // Cargar datos del usuario desde PostgreSQL
  useEffect(() => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/dashboard/', {
        headers: { Authorization: `Token ${token}` }
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(err => {
        console.error("Error al obtener datos del usuario:", err);
        if (err.response && err.response.status === 401) {
          handleLogout();
        }
      });
    }
  }, [token, handleLogout]);

  const navigateTo = (view) => {
    const path = view === 'dashboard' ? '/' : `/${view}`;
    window.history.pushState({}, '', path);
    setCurrentView(view);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '');
      setCurrentView(path || 'dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

      {/* 1. BARRA LATERAL */}
      <Sidebar 
        collapsed={collapsed} 
        currentView={currentView} 
        onNavigate={navigateTo} 
      />

      {/* 2. CONTENEDOR PRINCIPAL DERECHO */}
      <div className="relative z-10 flex-1 flex flex-col h-screen overflow-hidden">
        
        <Header 
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          currentView={currentView} 
          handleLogout={handleLogout}
          onNavigate={navigateTo}
          userData={userData}
        />

        {/* CONTENIDO CON PADDING INFERIOR PARA NO TRASLAPAR EL FOOTER */}
        <main className="flex-1 p-8 pb-16 overflow-y-auto">
          {currentView === 'dashboard' && (
            <Dashboard onNavigate={navigateTo} userData={userData} />
          )}

          {currentView === 'modulo01' && (
            <Modulo01 
              token={token}
              onBack={() => navigateTo('dashboard')} 
            />
          )}

          {currentView === 'modulo02' && (
            <Modulo02 
              token={token}
              onBack={() => navigateTo('dashboard')} 
            />
          )}
        </main>

      </div>

      {/* 3. FOOTER FIJO DE LADO A LADO POR ENCIMA DE TODO */}
      <Footer collapsed={collapsed} />

      {/* MODAL DE INACTIVIDAD */}
      {showInactivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-md w-full overflow-hidden text-left">
            <div className="bg-[#691C32] text-white p-5 flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <Clock size={24} className="text-amber-300 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide">Inactividad Detectada</h3>
                <p className="text-[11px] text-white/80">ALERTAS SIA - Control de Sesión</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-200/80 p-3.5 rounded-xl text-amber-900">
                <ShieldAlert size={20} className="shrink-0 text-amber-700 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  Tu sesión está a punto de expirar debido a un periodo de inactividad prolongado.
                </p>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                ¿Deseas mantener tu sesión activa para continuar trabajando o prefieres cerrar tu sesión?
              </p>
            </div>

            <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2"
              >
                <LogOut size={15} />
                <span>Cerrar Sesión</span>
              </button>

              <button
                onClick={extendSession}
                className="px-4 py-2.5 bg-[#691C32] hover:bg-[#521527] text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-2"
              >
                <RefreshCw size={15} />
                <span>Mantener Sesión Activa</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;