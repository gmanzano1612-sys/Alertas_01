import React, { useState, useRef, useEffect } from 'react';
import { 
  PanelLeft, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  KeyRound 
} from 'lucide-react';

function Header({ collapsed, setCollapsed, currentView, handleLogout, onNavigate, userData }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getViewTitle = () => {
    if (currentView === 'modulo01') return 'Cuotas Compensatorias';
    if (currentView === 'perfil') return 'Mi Perfil';
    if (currentView === 'seguridad') return 'Seguridad';
    return 'Dashboard';
  };

  // Extraer valores reales o mostrar carga si aún no responde la BD
  const username = userData?.username || 'Cargando...';
  const email = userData?.email || 'cargando@anam.gob.mx';
  const initial = username !== 'Cargando...' ? username.charAt(0).toUpperCase() : 'U';
  
  // Nombre completo (si first_name y last_name están vacíos, muestra el username)
  const fullName = (userData?.first_name || userData?.last_name) 
    ? `${userData.first_name} ${userData.last_name}`.trim() 
    : username;

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-6 py-2.5 flex justify-between items-center shadow-2xs z-30 sticky top-0">
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100/80 text-gray-600 transition cursor-pointer shadow-2xs"
          title={collapsed ? "Expandir barra lateral" : "Contraer barra lateral"}
        >
          <PanelLeft size={18} />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <span className="hover:text-gray-700 transition cursor-pointer" onClick={() => onNavigate && onNavigate('dashboard')}>
            FICHAS SIA
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-bold">{getViewTitle()}</span>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        
        {/* BOTÓN PÍLDORA DEL PERFIL CON DATOS DE POSTGRESQL */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2.5 bg-gray-50/90 border border-gray-200/80 hover:bg-gray-100/80 pl-1.5 pr-3 py-1 rounded-full transition cursor-pointer shadow-2xs group"
        >
          <div className="w-7 h-7 rounded-full bg-[#691C32] text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {initial}
          </div>
          <span className="text-xs font-semibold text-gray-700 max-w-[130px] truncate">
            {username}
          </span>
          {dropdownOpen ? (
            <ChevronUp size={14} className="text-gray-400 group-hover:text-gray-600" />
          ) : (
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600" />
          )}
        </button>

        {/* MENÚ DESPLEGABLE CON CORREO Y USUARIO REAL */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-gray-200/90 shadow-lg p-2 text-left z-50">
            
            <div className="px-3.5 py-3 border-b border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                CUENTA ACTIVA (POSTGRESQL)
              </span>
              <p className="text-xs font-bold text-gray-800 leading-snug">
                {fullName}
              </p>
              <p className="text-[11px] text-gray-500 truncate mt-0.5">
                {email}
              </p>
            </div>

            <div className="py-1.5 space-y-0.5">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  if (onNavigate) onNavigate('perfil');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100/80 rounded-xl transition cursor-pointer"
              >
                <User size={15} className="text-gray-500" />
                <span>Mi Perfil</span>
              </button>

              <div className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-gray-400 rounded-xl cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <Settings size={15} className="text-gray-300" />
                  <span>Configuración</span>
                </div>
                <span className="text-[9px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md border border-gray-200/60">
                  Pronto
                </span>
              </div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  if (onNavigate) onNavigate('seguridad');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100/80 rounded-xl transition cursor-pointer"
              >
                <KeyRound size={15} className="text-gray-500" />
                <span>Seguridad y Contraseña</span>
              </button>
            </div>

            <div className="pt-1.5 border-t border-gray-100 mt-1">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
              >
                <LogOut size={15} className="text-red-600" />
                <span>Cerrar Sesión</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </header>
  );
}

export default Header;