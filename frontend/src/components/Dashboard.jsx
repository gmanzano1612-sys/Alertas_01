import React from 'react';
import { 
  FileText, 
  ArrowRight, 
  ShieldAlert, 
  Layers, 
  Database, 
  KeyRound,
  Sparkles
} from 'lucide-react';

function Dashboard({ onNavigate }) {
  // Lista estructurada de módulos dinámicos con una única estructura de tarjeta
  const modulesList = [
    {
      id: 'modulo01',
      title: 'Modulo 01',
      description: 'Descripcion.',
      tag: 'ALERTAS',
      icon: FileText,
    },

    {id: 'modulo02',
      title: 'Modulo 02',
      description: 'Descripcion 02.',
      tag: 'ALERTAS',
      icon: KeyRound,
    },
    // Aquí podrás agregar nuevos módulos fácilmente manteniendo el mismo diseño
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-6">
      
      {/* BANNER PRINCIPAL INSTITUCIONAL */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-8 border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-5 text-[#691C32] pointer-events-none">
          <ShieldAlert size={220} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase">
                <Sparkles size={12} className="text-amber-700" />
                Panel de Control General
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
              Módulos del Sistema
            </h1>
            
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Selecciona el módulo requerido para iniciar tus operaciones dentro del sistema de administración aduanero y control de reportes CPED.
            </p>
          </div>

          {/* INDICADOR DINÁMICO DE MÓDULOS DISPONIBLES */}
          <div className="bg-[#691C32] text-white px-7 py-4 rounded-xl text-center shadow-md flex flex-col items-center justify-center shrink-0 border border-[#521527]">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/80 block">
              Disponibles
            </span>
            <span className="text-3xl font-extrabold font-mono mt-0.5 block">
              {String(modulesList.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* MÉTRICAS / STATUS RÁPIDO DEL SISTEMA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Módulos Habilitados
            </span>
            <span className="text-xl font-bold text-gray-800">{modulesList.length} Operativo{modulesList.length > 1 ? 's' : ''}</span>
          </div>
          <div className="p-3 bg-red-50 text-[#691C32] rounded-xl border border-red-100">
            <Layers size={22} />
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Base de Datos
            </span>
            <span className="text-xl font-bold text-gray-800">PostgreSQL</span>
          </div>
          <div className="p-3 bg-slate-50 text-slate-700 rounded-xl border border-slate-200">
            <Database size={22} />
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Seguridad / Sesión
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-emerald-700">Token DRF</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            <KeyRound size={22} />
          </div>
        </div>

      </div>

      {/* SECCIÓN DE TARJETAS DE MÓDULOS (RENDERIZADAS MEDIANTE ARREGLO) */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
          Catálogo de Módulos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {modulesList.map((mod) => {
            const IconComponent = mod.icon;
            return (
              <div 
                key={mod.id}
                className="group bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between relative"
              >
                {/* Borde superior vino institucional */}
                <div className="h-1.5 bg-[#691C32] w-full"></div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200/80 flex items-center justify-center text-[#691C32] group-hover:bg-[#691C32] group-hover:text-white transition-colors duration-200">
                      <IconComponent size={22} />
                    </div>
                    <span className="bg-slate-100 text-slate-700 font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-200/60">
                      {mod.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#691C32] transition-colors">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-gray-100 bg-gray-50/50">
                  <button
                    onClick={() => onNavigate(mod.id)}
                    className="w-full flex items-center justify-between text-xs font-bold text-[#691C32] hover:text-[#521527] transition cursor-pointer"
                  >
                    <span>Acceder al módulo</span>
                    <span className="w-8 h-8 rounded-full bg-white border border-gray-200 group-hover:bg-[#691C32] group-hover:text-white group-hover:border-[#691C32] transition-all flex items-center justify-center shadow-xs">
                      <ArrowRight size={14} />
                    </span>
                  </button>
                </div>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;