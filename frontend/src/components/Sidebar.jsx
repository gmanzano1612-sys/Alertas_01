import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  FileText, 
  User, 
  ChevronRight,
  ChevronDown,
  ChartLine,
  BadgeQuestionMark,
  SquareDimensions,
  Ship,
  Logs,
  ClipboardMinus,
  Search,
  BookSearch,
  House
} from 'lucide-react';

function Sidebar({ collapsed, currentView, onNavigate }) {
  const [openSubmenus, setOpenSubmenus] = useState({
    Catalogos: true, 
  });

  const toggleSubmenu = (menuId) => {
    if (collapsed) return; 
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const adminMenu = [
    { id: 'usuarios', label: 'Perfil', icon: Users },
    { id: 'perfiles', label: 'Cambio Contraseña', icon: ShieldCheck },
  ];

  const mainMenu = [
    { id: 'dashboard', label: 'HOME', icon: House },
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
        { id: 'cat_submarcafec', label: 'Submarca Afectada' },
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
      className={`sia-sidebar ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* LOGO INSTITUCIONAL SUPERIOR */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed ? (
          <div className="sia-sidebar-logo-box">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white text-[#4E232E] flex items-center justify-center font-bold text-[10px]">
                SIA
              </div>
              <span className="font-extrabold text-white text-sm tracking-wide">ALERTAS SIA</span>
            </div>
            <p className="text-[9px] text-amber-200/90 font-semibold tracking-tight uppercase mt-1 leading-tight">
              SISTEMA DE INCIDENCIAS Y ALERTAS 
            </p>
          </div>
        ) : (
          <div className="mx-auto bg-white text-[#4E232E] rounded-xl w-10 h-10 flex items-center justify-center font-bold text-xs shadow-xs">
            SIA
          </div>
        )}
      </div>

      {/* MENÚ DE NAVEGACIÓN */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6 scrollbar-thin">
        
        {/* SECCIÓN ADMINISTRACIÓN */}
        <div>
          {!collapsed ? (
            <p className="px-3 text-[10px] font-bold text-amber-300/90 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span>ADMINISTRACIÓN</span>
            </p>
          ) : (
            <div className="h-px bg-white/15 my-2 mx-2"></div>
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
                  className={`sia-sidebar-item ${
                    isActive ? 'sia-sidebar-item-active' : ''
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <Icon size={17} className={isActive ? 'text-[#4E232E]' : 'text-amber-200/80'} />
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
            <p className="px-3 text-[10px] font-bold text-amber-300/90 uppercase tracking-widest mb-2">
              FUNCIONES DEL SISTEMA
            </p>
          ) : (
            <div className="h-px bg-white/15 my-2 mx-2"></div>
          )}

          <nav className="space-y-1">
            {mainMenu.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = openSubmenus[item.id];

              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => {
                      if (hasSubItems && !collapsed) {
                        toggleSubmenu(item.id);
                      } else {
                        onNavigate(item.id);
                      }
                    }}
                    title={collapsed ? item.label : ''}
                    className={`sia-sidebar-item ${
                      isActive
                        ? 'bg-white/15 text-white font-bold border border-white/20 shadow-2xs'
                        : ''
                    } ${collapsed ? 'justify-center' : ''}`}
                  >
                    <Icon 
                      size={17} 
                      className={isActive ? 'text-amber-300' : 'text-amber-200/80'} 
                    />
                    {!collapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}
                    
                    {!collapsed && hasSubItems && (
                      <span className="text-white/60">
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </span>
                    )}
                    {!collapsed && !hasSubItems && isActive && (
                      <ChevronRight size={14} className="text-amber-300" />
                    )}
                  </button>

                  {!collapsed && hasSubItems && isExpanded && (
                    <div className="pl-9 pr-2 py-1 space-y-1 border-l-2 border-white/20 ml-4 my-1">
                      {item.subItems.map((sub) => {
                        const isSubActive = currentView === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => onNavigate(sub.id)}
                            className={`sia-sidebar-subitem ${
                              isSubActive ? 'sia-sidebar-subitem-active' : ''
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

    </aside>
  );
}

export default Sidebar;