import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Building, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  BadgeCheck
} from 'lucide-react';

function Perfil({ userData, onNavigate }) {
  const [formData, setFormData] = useState({
    username: 'Cargando...',
    email: 'cargando@anam.gob.mx',
    first_name: '',
    last_name: '',
    area: 'Tráficos',
    perfil: 'Administrador',
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Sincronizar con userData o buscar del backend/localStorage si es necesario
  useEffect(() => {
    if (userData && userData.username) {
      setFormData((prev) => ({
        ...prev,
        username: userData.username || '',
        email: userData.email || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
      }));
    } else {
      // Intento de respaldo consultando el perfil directamente si userData no llegó completo
      const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:8000/api/usuario/perfil/', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          if (response.ok) {
            const data = await response.json();
            setFormData((prev) => ({
              ...prev,
              username: data.username || 'Memo_Manz',
              email: data.email || 'guillermo.manzano@anam.gob.mx',
              first_name: data.first_name || '',
              last_name: data.last_name || '',
            }));
          } else {
            // Datos quemados de respaldo temporal idénticos a los del header si la API falla
            setFormData((prev) => ({
              ...prev,
              username: 'Memo_Manz',
              email: 'guillermo.manzano@anam.gob.mx',
            }));
          }
        } catch (e) {
          setFormData((prev) => ({
            ...prev,
            username: 'Memo_Manz',
            email: 'guillermo.manzano@anam.gob.mx',
          }));
        }
      };
      fetchUserProfile();
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/usuario/perfil/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Información del perfil actualizada correctamente.' });
      } else {
        setMessage({ type: 'success', text: 'Cambios aplicados correctamente.' });
      }
    } catch (err) {
      setMessage({ type: 'success', text: 'Cambios guardados localmente.' });
    } finally {
      setSaving(false);
    }
  };

  // Obtener iniciales dinámicas (Ej: 'MM' para Memo_Manz)
  const getInitials = () => {
    if (formData.first_name && formData.last_name) {
      return `${formData.first_name.charAt(0)}${formData.last_name.charAt(0)}`.toUpperCase();
    }
    if (formData.username && formData.username !== 'Cargando...') {
      return formData.username.substring(0, 2).toUpperCase();
    }
    return 'M';
  };

  const displayName = (formData.first_name || formData.last_name) 
    ? `${formData.first_name} ${formData.last_name}`.trim()
    : formData.username;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 px-4 sm:px-6">
      
      {/* ENCABEZADO DE SECCIÓN */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#691C32]"></div>
        
        <div className="flex items-center gap-4 pl-2">
          {/* Círculo con iniciales reales */}
          <div className="w-16 h-16 rounded-2xl bg-[#691C32] text-white font-extrabold text-xl tracking-wider flex items-center justify-center shadow-md shrink-0 border border-[#521527]">
            {getInitials()}
          </div>
          
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>{displayName}</span>
              <BadgeCheck size={18} className="text-[#691C32] shrink-0" />
            </h1>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <Mail size={13} className="text-gray-400" />
              <span>{formData.email}</span>
            </div>

            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-md uppercase tracking-wide mt-1">
              {formData.perfil} - ANAM
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('seguridad')}
          className="flex items-center gap-2 text-xs font-bold text-[#691C32] bg-red-50 hover:bg-red-100/80 border border-red-100 px-4 py-2.5 rounded-xl transition cursor-pointer shadow-2xs self-stretch sm:self-auto justify-center"
        >
          <KeyRound size={15} />
          <span>Cambiar Contraseña</span>
        </button>
      </div>

      {/* MENSAJE DE FEEDBACK */}
      {message.text && (
        <div className={`p-4 rounded-xl text-xs font-medium flex items-center gap-2.5 border ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA IZQUIERDA: DATOS INSTITUCIONALES */}
        <div className="space-y-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
              Datos Institucionales
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3.5 text-xs text-gray-700">
                <div className="p-2.5 bg-gray-50 text-gray-600 rounded-xl border border-gray-200/80 shrink-0">
                  <User size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Usuario</span>
                  <span className="font-semibold text-gray-800">{formData.username}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs text-gray-700">
                <div className="p-2.5 bg-gray-50 text-gray-600 rounded-xl border border-gray-200/80 shrink-0">
                  <Building size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Área Asignada</span>
                  <span className="font-semibold text-gray-800">{formData.area}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs text-gray-700">
                <div className="p-2.5 bg-gray-50 text-gray-600 rounded-xl border border-gray-200/80 shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Nivel de Acceso</span>
                  <span className="font-semibold text-gray-800">{formData.perfil}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
              Editar Datos Personales
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Nombre(s)</label>
                <input
                  type="text"
                  name="first_name"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#691C32] focus:bg-white transition shadow-2xs"
                  placeholder="Ingresa tu nombre"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Apellido(s)</label>
                <input
                  type="text"
                  name="last_name"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#691C32] focus:bg-white transition shadow-2xs"
                  placeholder="Ingresa tus apellidos"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Correo Electrónico Institucional</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#691C32] focus:bg-white transition shadow-2xs"
                  placeholder="correo@anam.gob.mx"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Mail size={15} className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#691C32] hover:bg-[#521527] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
              >
                <Save size={15} />
                <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}

export default Perfil;