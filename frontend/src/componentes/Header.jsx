import React, { useState, useRef, useEffect } from 'react';
import { 
  PanelLeft, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Settings, 
  LogOut, 
  KeyRound,
  Bell,
  AlertTriangle,
  Mail,
  CheckCircle2,
  Clock
} from 'lucide-react';

function Header({ collapsed, setCollapsed, currentView, handleLogout, onNavigate, userData }) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [alertsDropdownOpen, setAlertsDropdownOpen] = useState(false);
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);

  // Estado para la pestaña activa en el menú de notificaciones ("todos", "no_leidos", "mensajes")
  const [activeTab, setActiveTab] = useState('todos');

  const profileRef = useRef(null);
  const alertsRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (alertsRef.current && !alertsRef.current.contains(event.target)) {
        setAlertsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getViewTitle = () => {
    if (currentView === 'modulo01') return 'Modulo_01';
    if (currentView === 'perfil') return 'Mi Perfil';
    if (currentView === 'seguridad') return 'Seguridad';
    if (currentView === 'modulo02') return 'Modulo_02';
    return 'House';
  };

  const username = userData?.username || 'Cargando...';
  const email = userData?.email || 'cargando@anam.gob.mx';
  const initial = username !== 'Cargando...' ? username.charAt(0).toUpperCase() : 'U';
  
  const fullName = (userData?.first_name || userData?.last_name) 
    ? `${userData.first_name} ${userData.last_name}`.trim() 
    : username;

  const activeAlertsList = [
    { id: 1, title: 'Incidencia Marítima Detectada', time: 'Hace 5 min', type: 'high' },
    { id: 2, title: 'Alerta de Carga Aérea Pendiente', time: 'Hace 25 min', type: 'medium' },
  ];

  // Lista de notificaciones con su respectivo estado
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, text: 'Nuevo manifiesto registrado en sistema', read: false, type: 'msg' },
    { id: 2, text: 'Actualización de catálogo de mercancía', read: false, type: 'notif' },
    { id: 3, text: 'Cierre de sesión automático configurado', read: true, type: 'notif' },
  ]);

  const unreadCount = notificationsList.filter(n => !n.read).length;

  // Filtrar notificaciones según la pestaña seleccionada
  const filteredNotifications = notificationsList.filter(item => {
    if (activeTab === 'no_leidos') return !item.read;
    if (activeTab === 'mensajes') return item.type === 'msg';
    return true; // 'todos'
  });

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-6 py-2.5 flex justify-between items-center shadow-2xs z-30 sticky top-0">
      
      {/* SECCIÓN IZQUIERDA */}
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
            ALERTAS SIA
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-bold">{getViewTitle()}</span>
        </div>
      </div>

      {/* SECCIÓN DERECHA */}
      <div className="flex items-center gap-3">

        {/* 1. ALERTAS ACTIVAS */}
        <div className="relative" ref={alertsRef}>
          <button
            onClick={() => {
              setAlertsDropdownOpen(!alertsDropdownOpen);
              setNotificationsDropdownOpen(false);
              setProfileDropdownOpen(false);
            }}
            className="flex items-center gap-2 bg-gray-50/90 border border-gray-200/80 hover:bg-gray-100/80 px-3 py-1.5 rounded-full transition cursor-pointer shadow-2xs group"
          >
            <div className="relative flex items-center justify-center text-[#691C32]">
              <AlertTriangle size={16} />
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-bold px-1 py-0.2 rounded-full leading-none">
                {activeAlertsList.length}
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-700 hidden sm:inline">Alertas</span>
          </button>

          {alertsDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-gray-200/90 shadow-xl p-3 text-left z-50">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 px-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Alertas Activas ({activeAlertsList.length})
                </span>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  En Línea
                </span>
              </div>

              <div className="py-2 space-y-1.5 max-h-60 overflow-y-auto">
                {activeAlertsList.map((alert) => (
                  <div key={alert.id} className="p-2.5 bg-red-50/60 border border-red-100 rounded-xl hover:bg-red-50 transition cursor-pointer">
                    <p className="text-xs font-bold text-gray-800">{alert.title}</p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                      <Clock size={11} />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 text-center">
                <button 
                  onClick={() => { setAlertsDropdownOpen(false); onNavigate('con_historico'); }}
                  className="text-[11px] font-bold text-[#691C32] hover:underline"
                >
                  Ver todas las alertas
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. NOTIFICACIONES CON PESTAÑAS TIPO PÍLDORA */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setNotificationsDropdownOpen(!notificationsDropdownOpen);
              setAlertsDropdownOpen(false);
              setProfileDropdownOpen(false);
            }}
            className="flex items-center gap-2 bg-gray-50/90 border border-gray-200/80 hover:bg-gray-100/80 px-3 py-1.5 rounded-full transition cursor-pointer shadow-2xs group"
          >
            <div className="relative flex items-center justify-center text-gray-700">
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-600 text-white text-[9px] font-bold px-1 py-0.2 rounded-full leading-none">
                  {unreadCount}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-gray-700 hidden sm:inline">Bandeja</span>
          </button>

          {notificationsDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-gray-200/90 shadow-xl p-3 text-left z-50">
              
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 px-1 mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Bandeja de Entrada
                </span>
                <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                  {unreadCount} sin leer
                </span>
              </div>

              {/* PESTAÑAS ESTILO PÍLDORA (TODOS, NO LEÍDOS, MENSAJES) */}
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl mb-3">
                <button
                  onClick={() => setActiveTab('todos')}
                  className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition cursor-pointer ${
                    activeTab === 'todos' 
                      ? 'bg-[#691C32] text-white shadow-xs' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setActiveTab('no_leidos')}
                  className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition cursor-pointer ${
                    activeTab === 'no_leidos' 
                      ? 'bg-[#691C32] text-white shadow-xs' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  No leídos
                </button>
                <button
                  onClick={() => setActiveTab('mensajes')}
                  className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition cursor-pointer ${
                    activeTab === 'mensajes' 
                      ? 'bg-[#691C32] text-white shadow-xs' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mensajes
                </button>
              </div>

              {/* LISTA FILTRADA DE NOTIFICACIONES */}
              <div className="py-1 space-y-1.5 max-h-60 overflow-y-auto">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      onClick={() => {
                        setNotificationsList(notificationsList.map(n => n.id === notif.id ? {...n, read: true} : n));
                      }}
                      className={`p-2.5 rounded-xl border transition cursor-pointer flex items-start gap-2.5 ${notif.read ? 'bg-white border-gray-100 text-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 font-medium'}`}
                    >
                      <div className="mt-0.5 shrink-0 text-[#691C32]">
                        {notif.type === 'msg' ? <Mail size={14} /> : <CheckCircle2 size={14} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs">{notif.text}</p>
                        <span className="text-[9px] text-gray-400 mt-0.5 block">Hace un momento</span>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#691C32] shrink-0 self-center"></span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-gray-400">
                    No hay elementos en esta vista
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-gray-100 text-center mt-2">
                <button 
                  onClick={() => {
                    setNotificationsList(notificationsList.map(n => ({...n, read: true})));
                  }}
                  className="text-[11px] font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Marcar todas como leídas
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. PERFIL DE USUARIO */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setAlertsDropdownOpen(false);
              setNotificationsDropdownOpen(false);
            }}
            className="flex items-center gap-2.5 bg-gray-50/90 border border-gray-200/80 hover:bg-gray-100/80 pl-1.5 pr-3 py-1 rounded-full transition cursor-pointer shadow-2xs group"
          >
            <div className="w-7 h-7 rounded-full bg-[#691C32] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {initial}
            </div>
            <span className="text-xs font-semibold text-gray-700 max-w-[130px] truncate hidden sm:inline">
              {username}
            </span>
            {profileDropdownOpen ? (
              <ChevronUp size={14} className="text-gray-400 group-hover:text-gray-600" />
            ) : (
              <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600" />
            )}
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-gray-200/90 shadow-xl p-2 text-left z-50">
              
              <div className="px-3.5 py-3 border-b border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  CUENTA ACTIVA
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
                    setProfileDropdownOpen(false);
                    if (onNavigate) onNavigate('perfil');
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100/80 rounded-xl transition cursor-pointer"
                >
                  <User size5={15} className="text-gray-500" />
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
                    setProfileDropdownOpen(false);
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
                    setProfileDropdownOpen(false);
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

      </div>
    </header>
  );
}

export default Header;