import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Save, 
  CheckCircle2, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  HelpCircle
} from 'lucide-react';

function Atl_nueva_alerta({ isOpen, onClose, onSaveSuccess }) {
  const catalogosLocales = {
    tipoAlerta: [
      { id: 1, nombre: 'Consulta' },
      { id: 2, nombre: 'Urgente' },
      { id: 3, nombre: 'Informativa' }
    ],
    dependencias: [
      { id: 1, nombre: 'Dirección General de Procesamiento Electrónico' },
      { id: 2, nombre: 'Administración General de Aduanas' }
    ],
    tipoRiesgo: [
      { id: 1, nombre: 'Selecciona un Tipo de Riesgo' },
      { id: 2, nombre: 'Alto' },
      { id: 3, nombre: 'Medio' },
      { id: 4, nombre: 'Bajo' }
    ],
    aduanas: [
      { id: 1, nombre: 'Selecciona una Aduana' },
      { id: 2, nombre: 'Aduana de Veracruz' },
      { id: 3, nombre: 'Aduana de Manzanillo' },
      { id: 4, nombre: 'Aduana del AICM' }
    ],
    tipoTrafico: [
      { id: 1, nombre: 'Selecciona una opción' },
      { id: 2, nombre: 'Marítimo' },
      { id: 3, nombre: 'Aéreo' },
      { id: 4, nombre: 'Terrestre' }
    ]
  };

  const [formData, setFormData] = useState({
    tipo_alerta_id: '1',
    usuario: 'Guillermo David Manzano Antonio',
    dependencia: 'Dirección General de Procesamiento Electrónico',
    prioridad: 'Normal',
    tipo_riesgo_id: '',
    aduana_id: '',
    tipo_trafico_id: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  
  const [elementPath, setElementPath] = useState('p');
  const editorRef = useRef(null);

  useEffect(() => {
    if (isOpen && editorRef.current) {
      editorRef.current.innerHTML = '<p>Justificación Alerta</p>';
      updateElementPath();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      updateElementPath();
    }
  };

  const updateElementPath = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    let node = selection.anchorNode;
    const path = [];

    while (node && node !== editorRef.current && node.nodeType === Node.ELEMENT_NODE) {
      path.unshift(node.nodeName.toLowerCase());
      node = node.parentNode;
    }
    if (path.length === 0) path.push('p');
    setElementPath(path.join(' » '));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        if (onSaveSuccess) onSaveSuccess();
        onClose();
      }, 800);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      
      {/* VENTANA MODAL PRINCIPAL */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* ENCABEZADO CON FRANJA INSTITUCIONAL VINO Y TÍTULO AJUSTADO */}
        <div className="relative bg-[#691C32] text-white px-6 py-4 flex justify-between items-center shadow-md">
          {/* Franja superior decorativa de refuerzo */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#4E232E]"></div>

          <div className="flex items-center gap-3 pt-1">
            <h2 className="text-sm font-bold tracking-wide text-white uppercase">
              Datos Generales de la Alerta
            </h2>
          </div>

          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition p-1.5 rounded-xl hover:bg-white/10 cursor-pointer pt-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENIDO DEL FORMULARIO */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1 bg-gray-50/40">
          
          {successMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>¡Alerta registrada correctamente!</span>
            </div>
          )}

          {/* FILA 1 DE COMBOS CON TOOLTIPS HACIA ABAJO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Tipo Alerta */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Area del Usuario</label>
                <div className="group relative cursor-pointer text-gray-400 hover:text-[#691C32]">
                  <HelpCircle size={13} />
                  {/* Tooltip posicionado abajo para que no se corte */}
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 hidden group-hover:block w-44 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl z-30 text-center pointer-events-none">
                    Selecciona la clasificación operativa de la alerta.
                  </div>
                </div>
              </div>
              <select
                name="tipo_alerta_id"
                value={formData.tipo_alerta_id}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#691C32] transition shadow-2xs cursor-pointer"
              >
                {catalogosLocales.tipoAlerta.map((item) => (
                  <option key={item.id} value={item.id}>{item.nombre}</option>
                ))}
              </select>
            </div>

            {/* Usuario Responsable */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Usuario</label>
                <div className="group relative cursor-pointer text-gray-400 hover:text-[#691C32]">
                  <HelpCircle size={13} />
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 hidden group-hover:block w-44 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl z-30 text-center pointer-events-none">
                    Nombre del operador a cargo del registro.
                  </div>
                </div>
              </div>
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#691C32] transition shadow-2xs"
              />
            </div>

            {/* Dependencia */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Dependencia</label>
                <div className="group relative cursor-pointer text-gray-400 hover:text-[#691C32]">
                  <HelpCircle size={13} />
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 hidden group-hover:block w-44 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl z-30 text-center pointer-events-none">
                    Institución o unidad emisora de la notificación.
                  </div>
                </div>
              </div>
              <input
                type="text"
                name="dependencia"
                value={formData.dependencia}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#691C32] transition shadow-2xs"
              />
            </div>

            {/* Prioridad */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tipo de Alerta</label>
                <div className="group relative cursor-pointer text-gray-400 hover:text-[#691C32]">
                  <HelpCircle size={13} />
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 hidden group-hover:block w-44 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl z-30 text-center pointer-events-none">
                    Nivel de urgencia asignado para su atención.
                  </div>
                </div>
              </div>
              <select
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#691C32] transition shadow-2xs cursor-pointer"
              >
                <option value="Normal">Normal</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>
          </div>

          {/* FILA 2 DE COMBOS CON TOOLTIPS HACIA ABAJO */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Tipo de Riesgo */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tipo de Riesgo</label>
                <div className="group relative cursor-pointer text-gray-400 hover:text-[#691C32]">
                  <HelpCircle size={13} />
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 hidden group-hover:block w-44 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl z-30 text-center pointer-events-none">
                    Factor o grado de vulnerabilidad detectado.
                  </div>
                </div>
              </div>
              <select
                name="tipo_riesgo_id"
                value={formData.tipo_riesgo_id}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#691C32] transition shadow-2xs cursor-pointer"
              >
                {catalogosLocales.tipoRiesgo.map((item, idx) => (
                  <option key={idx} value={item.nombre}>{item.nombre}</option>
                ))}
              </select>
            </div>

            {/* Aduana */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Aduana</label>
                <div className="group relative cursor-pointer text-gray-400 hover:text-[#691C32]">
                  <HelpCircle size={13} />
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 hidden group-hover:block w-44 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl z-30 text-center pointer-events-none">
                    Recinto fiscalizado donde ocurre la incidencia.
                  </div>
                </div>
              </div>
              <select
                name="aduana_id"
                value={formData.aduana_id}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#691C32] transition shadow-2xs cursor-pointer"
              >
                {catalogosLocales.aduanas.map((item, idx) => (
                  <option key={idx} value={item.nombre}>{item.nombre}</option>
                ))}
              </select>
            </div>

            {/* Tipo de Tráfico */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tipo de Tráfico</label>
                <div className="group relative cursor-pointer text-gray-400 hover:text-[#691C32]">
                  <HelpCircle size={13} />
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 hidden group-hover:block w-44 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl z-30 text-center pointer-events-none">
                    Medio de transporte o vía de ingreso (Marítimo, Aéreo, etc.).
                  </div>
                </div>
              </div>
              <select
                name="tipo_trafico_id"
                value={formData.tipo_trafico_id}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#691C32] transition shadow-2xs cursor-pointer"
              >
                {catalogosLocales.tipoTrafico.map((item, idx) => (
                  <option key={idx} value={item.nombre}>{item.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          {/* EDITOR DE TEXTO ENRIQUECIDO */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Descripción y Observaciones</label>
              <div className="group relative cursor-pointer text-gray-400 hover:text-[#691C32]">
                <HelpCircle size={13} />
                <div className="absolute bottom-full mb-1 right-0 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl z-30 text-center pointer-events-none">
                  Detalla la información clave aplicando el formato de texto necesario.
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              
              {/* Menús superiores simulados */}
              <div className="bg-gray-100/90 px-3 py-1.5 border-b border-gray-200 flex items-center gap-4 text-xs text-gray-700 font-medium">
                <span className="cursor-pointer hover:text-[#691C32] transition">Editar ▾</span>
                <span className="cursor-pointer hover:text-[#691C32] transition">Formato ▾</span>
              </div>

              {/* Barra de herramientas */}
              <div className="bg-white px-3 py-2 border-b border-gray-200 flex flex-wrap items-center gap-1 text-gray-700">
                <button type="button" onClick={() => handleFormat('bold')} className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer" title="Negrita"><Bold size={15} /></button>
                <button type="button" onClick={() => handleFormat('italic')} className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer" title="Cursiva"><Italic size={15} /></button>
                <button type="button" onClick={() => handleFormat('underline')} className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer" title="Subrayado"><Underline size={15} /></button>
                <button type="button" onClick={() => handleFormat('strikethrough')} className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer" title="Tachado"><Strikethrough size={15} /></button>
                
                <div className="h-4 w-px bg-gray-200 mx-1"></div>
                
                <div className="relative flex items-center">
                  <input 
                    type="color" 
                    onChange={(e) => handleFormat('foreColor', e.target.value)} 
                    className="w-6 h-6 border-0 cursor-pointer bg-transparent rounded" 
                    title="Color de texto" 
                  />
                </div>

                <div className="h-4 w-px bg-gray-200 mx-1"></div>

                <button type="button" onClick={() => handleFormat('insertUnorderedList')} className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer" title="Lista"><List size={15} /></button>
                <button type="button" onClick={() => handleFormat('insertOrderedList')} className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer" title="Lista numerada"><ListOrdered size={15} /></button>

                <div className="h-4 w-px bg-gray-200 mx-1"></div>

                <button type="button" onClick={() => handleFormat('justifyLeft')} className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer" title="Izquierda"><AlignLeft size={15} /></button>
                <button type="button" onClick={() => handleFormat('justifyCenter')} className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer" title="Centrar"><AlignCenter size={15} /></button>
                <button type="button" onClick={() => handleFormat('justifyRight')} className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer" title="Derecha"><AlignRight size={15} /></button>
                <button type="button" onClick={() => handleFormat('justifyFull')} className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer" title="Justificar"><AlignJustify size={15} /></button>
              </div>

              {/* Área editable */}
              <div 
                ref={editorRef}
                contentEditable={true}
                onKeyUp={updateElementPath}
                onClick={updateElementPath}
                className="w-full p-4 min-h-[120px] text-xs text-gray-800 focus:outline-none bg-white overflow-y-auto"
                style={{ maxHeight: '180px' }}
              ></div>

              {/* Ruta HTML inferior */}
              <div className="bg-gray-50 px-3 py-1.5 border-t border-gray-200 text-[11px] text-gray-500 font-mono">
                {elementPath}
              </div>

            </div>
          </div>

          {/* PIE DEL MODAL CON BOTONES PROFESIONALES */}
          <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer shadow-2xs"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="bg-[#691C32] hover:bg-[#521527] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              <Save size={15} />
              <span>{submitting ? 'Guardando...' : 'Guardar Alerta'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Atl_nueva_alerta;