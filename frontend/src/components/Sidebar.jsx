import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  LayoutDashboard, 
  FileText, 
  User, 
  ChevronRight,
  ChevronDown,
  Building2,
  ChartLine,
  BadgeQuestionMark,
  SquareDimensions,
  Ship,
  Logs,
  ClipboardMinus,
  Search,
  BookSearch,
  FolderOpen
} from 'lucide-react';

function Sidebar({ collapsed, currentView, onNavigate }) {
  // Estado para controlar qué menús con subopciones están expandidos
  // Por defecto abrimos 'Catalogos' como ejemplo, puedes cambiarlo o iniciarlo vacío {}
  const [openSubmenus, setOpenSubmenus] = useState({
    Catalogos: true, 
  });

  const toggleSubmenu = (menuId) => {
    if (collapsed) return; // Si la barra está contraída no se despliega en acordeón clásico
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const adminMenu = [
    { id: 'usuarios', label: 'Perfil', icon: Users },
    { id: 'perfiles', label: 'Cambio Contraseña', icon: ShieldCheck },
  ];

  // Menú principal estructurado. Algunos elementos pueden incluir un arreglo 'subItems'
  const mainMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'modulo01', label: 'Modulo_01', icon: FileText },
    { id: 'modulo02', label: 'Modulo_02', icon: FileText },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
    { 
      id: 'Catalogos', label: 'Catalogos', icon: BookSearch,
      subItems: [
        { id: 'cat_usuarios', label: 'Usuarios' },
        { id: 'cat_mercancia', label: 'Mercancia' },
        { id: 'cat_tincidencia', label: 'Tipo de Incidencia' },
        { id: 'cat_marcaafect', label: 'Marca Afectada' },
        { id: 'cat_tincidencia', label: 'Submarca Afectada' },
      ]
    },
    { 
      id: 'Consultas', label: 'Consultas', icon: Search,
      subItems: [
        { id: 'con_general', label: 'Acceso' },
        { id: 'con_historico', label: 'Consulta Alertas' },
        { id: 'cat_c-gral-alt', label: 'Consulta Gral Alertas' },
        { id: 'cat_c-dim-alt', label: 'Consulta Dinamica de Alertas' },
      ]
    },
    { id: 'Reportes', label: 'Reportes', icon: ClipboardMinus,
        subItems: [
        { id: 'rep_alertas', label: 'Reporte de Alertas' },
        { id: 'rep_maritimo', label: 'Reporte Marítimo' },
        { id: 'rep cargaereo', label: 'Reporte Carga Aéreo' },
        { id: 'rep_estalerta', label: 'Reporte Estado Alerta' },
      ]
     },
    { id: 'Listas', label: 'Listas', icon: Logs,
        subItems: [
        { id: 'list_manifiesto', label: 'Lista de Manifiestos' },
        { id: 'list_pasajeros', label: 'Lista de Pasajeros' },
        { id: 'list_vehiculos', label: 'Lista de Vehiculos' },
      ]
     },
    { id: 'Mmaritimo', label: 'Modelo Maritimo', icon: Ship,
        subItems: [
        { id: 'list_exalt', label: 'Lista de Elementos por Alertar' },
        { id: 'list_elemalert', label: 'Lista de Elementos Alertados' },
      ]
     },
    { id: 'opciones', label: 'Opciones', icon: SquareDimensions,
        subItems: [
        { id: 'dash_graf', label: 'Dashboard' },
      ]
     },
    { id: 'Ayuda', label: 'Ayuda', icon: BadgeQuestionMark,
        subItems: [
        { id: 'Estrategias_sia', label: 'Estrategias SIA' },
        { id: 'man_UsuarioCPED', label: 'Manual Usuario CPED' },
        { id: 'manual_chatCPED', label: 'Manual Chat CPED' },
        { id: 'manual_UsuarioAdu', label: 'Manual Usuario Aduanas' },
      ]
     },
    { id: 'Analisis', label: 'Analisis', icon: ChartLine,
        subItems: [
        { id: 'res_alertas', label: 'Resumen Alertas' },
        { id: 'rep_mensual', label: 'Reporte Mensual' },
        { id: 'not_info', label: 'Nota Informativa' },
      ]
     },
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
              <span className="font-extrabold text-[#691C32] text-sm tracking-wide">ALERTAS SIA</span>
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

        {/* SECCIÓN FUNCIONES PRINCIPALES */}
        <div>
          {!collapsed ? (
            <p className="px-3 text-[10px] font-bold text-amber-800/90 uppercase tracking-widest mb-2">
              FUNCIONES PRINCIPALES
            </p>
          ) : (
            <div className="h-px bg-gray-200 my-2 mx-2"></div>
          )}

          <nav className="space-y-1">
            {mainMenu.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = openSubmenus[item.id];

              return (
                <div key={item.id} className="space-y-1">
                  {/* Botón Principal del Menú */}
                  <button
                    onClick={() => {
                      if (hasSubItems && !collapsed) {
                        toggleSubmenu(item.id);
                      } else {
                        onNavigate(item.id);
                      }
                    }}
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
                    
                    {/* Indicadores de Submenú */}
                    {!collapsed && hasSubItems && (
                      <span className="text-gray-400">
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </span>
                    )}
                    {!collapsed && !hasSubItems && isActive && (
                      <ChevronRight size={14} className="text-[#691C32]" />
                    )}
                  </button>

                  {/* Renderizado de Submenús Desplegables */}
                  {!collapsed && hasSubItems && isExpanded && (
                    <div className="pl-9 pr-2 py-1 space-y-1 border-l-2 border-amber-200/60 ml-4 my-1">
                      {item.subItems.map((sub) => {
                        const isSubActive = currentView === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => onNavigate(sub.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                              isSubActive
                                ? 'bg-[#691C32] text-white font-bold shadow-xs'
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 font-medium'
                            }`}
                          >
                            {sub.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
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