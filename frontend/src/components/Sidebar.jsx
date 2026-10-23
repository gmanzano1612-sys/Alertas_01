import React from 'react';
import { 
  Users, 
  UserCheck, 
  Key, 
  ShieldCheck, 
  Settings, 
  LayoutDashboard, 
  FileText, 
  User, 
  ChevronRight,
  Building2
} from 'lucide-react';

function Sidebar({ collapsed, currentView, onNavigate }) {
  // Lista estructurada de navegación
  const adminMenu = [
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'perfiles', label: 'Perfiles', icon: UserCheck },
    { id: 'permisos', label: 'Permisos', icon: Key },
    { id: 'seguridad', label: 'Seguridad', icon: ShieldCheck },
    { id: 'ajustes', label: 'Ajustes', icon: Settings },
  ];

  const mainMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'modulo01', label: 'Modulo_01', icon: FileText },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
  ];

  return (
    <aside
      className={`bg-white/95 backdrop-blur-md border-r border-gray-200/80 flex flex-col h-screen transition-all duration-300 z-20 shrink-0 shadow-xs ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* LOGO INSTITUCIONAL SUPERIOR */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        {!collapsed ? (
          <div className="bg-gradient-to-br from-amber-50/80 to-amber-100/40 border border-amber-200/70 rounded-xl p-3 w-full shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#691C32] text-white flex items-center justify-center font-bold text-[10px]">
                SIA
              </div>
              <span className="font-extrabold text-[#691C32] text-sm tracking-wide">FICHAS SIA</span>
            </div>
            <p className="text-[9px] text-amber-900/80 font-semibold tracking-tight uppercase mt-1 leading-tight">
              SISTEMA DE INCIDENCIAS Y ALERTAS 
            </p>
          </div>
        ) : (
          <div className="mx-auto bg-[#691C32] text-white rounded-xl w-10 h-10 flex items-center justify-center font-bold text-xs shadow-xs border border-[#521527]">
            SIA
          </div>
        )}
      </div>

      {/* MENÚ DE NAVEGACIÓN */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6 scrollbar-thin">
        
        {/* SECCIÓN ADMINISTRACIÓN */}
        <div>
          {!collapsed ? (
            <p className="px-3 text-[10px] font-bold text-amber-800/90 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span>ADMINISTRACIÓN</span>
            </p>
          ) : (
            <div className="h-px bg-gray-200 my-2 mx-2"></div>
          )}

          <nav className="space-y-1">
            {adminMenu.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  title={collapsed ? item.label : ''}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#691C32] text-white font-bold shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <Icon size={17} className={isActive ? 'text-white' : 'text-gray-500'} />
                  {!collapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SECCIÓN MENÚ PRINCIPAL */}
        <div>
          {!collapsed ? (
            <p className="px-3 text-[10px] font-bold text-amber-800/90 uppercase tracking-widest mb-2">
              MENÚ PRINCIPAL
            </p>
          ) : (
            <div className="h-px bg-gray-200 my-2 mx-2"></div>
          )}

          <nav className="space-y-1">
            {mainMenu.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  title={collapsed ? item.label : ''}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/10 text-[#691C32] font-bold border border-amber-200/60 shadow-2xs'
                      : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 font-medium'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <Icon 
                    size={17} 
                    className={isActive ? 'text-[#691C32]' : 'text-gray-500'} 
                  />
                  {!collapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}
                  {!collapsed && isActive && (
                    <ChevronRight size={14} className="text-[#691C32]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* PIE DE LA SIDEBAR */}
      <div className="p-3 border-t border-gray-100 bg-gray-50/50">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <Building2 size={16} className="text-gray-400 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-[10px] font-bold text-gray-700 truncate">ANAM</p>
              <p className="text-[9px] text-gray-400 truncate">© 2026 Todos los derechos</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-gray-400 py-1" title="Hacienda | Aduanas 2026">
            <Building2 size={16} />
          </div>
        )}
      </div>

    </aside>
  );
}

export default Sidebar;