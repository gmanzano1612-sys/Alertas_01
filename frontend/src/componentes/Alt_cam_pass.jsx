import { useState, useEffect } from 'react';
import axios from 'axios';

function Modulo01({ token, onBack }) {
  const [alertas, setAlertas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nivel, setNivel] = useState('Medio');
  const [loading, setLoading] = useState(false);

  // Cargar alertas desde Django REST Framework
  const fetchAlertas = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/alertas/', {
        headers: { Authorization: `Token ${token}` },
      });
      setAlertas(response.data);
    } catch (err) {
      console.error('Error al cargar alertas:', err);
    }
  };

  useEffect(() => {
    fetchAlertas();
  }, [token]);

  // Crear una nueva alerta
  const handleCreateAlerta = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/alertas/',
        { titulo, descripcion, nivel, activo: true },
        { headers: { Authorization: `Token ${token}` } }
      );
      setTitulo('');
      setDescripcion('');
      setNivel('Medio');
      fetchAlertas(); // Recargar lista
    } catch (err) {
      console.error('Error al crear alerta:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* BARRA SUPERIOR */}
      <header className="w-full bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <span className="bg-[#691C32] text-white px-3 py-1 rounded text-xs font-bold tracking-wide">
            FICHAS SIA
          </span>
          <h2 className="text-lg font-semibold text-gray-800">Módulo 01 - Gestión de Alertas</h2>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#691C32] hover:bg-[#521527] text-white rounded-lg text-sm font-medium transition cursor-pointer shadow-sm"
        >
          ← Volver al Dashboard
        </button>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 w-full p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FORMULARIO PARA NUEVA ALERTA */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
            <h3 className="text-md font-bold text-[#691C32] mb-4 pb-2 border-b border-gray-100">
              Registrar Nueva Alerta
            </h3>
            <form onSubmit={handleCreateAlerta} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">TÍTULO</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  placeholder="Ej. Servidor principal con alta carga"
                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#691C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">DESCRIPCIÓN</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  rows="3"
                  placeholder="Detalles de la incidencia..."
                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#691C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">NIVEL DE PRIORIDAD</label>
                <select
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#691C32]"
                >
                  <option value="Bajo">Bajo</option>
                  <option value="Medio">Medio</option>
                  <option value="Alto">Alto</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#691C32] hover:bg-[#521527] text-white rounded-lg font-bold text-xs tracking-wider transition cursor-pointer shadow-md"
              >
                {loading ? 'Guardando...' : 'GUARDAR ALERTA'}
              </button>
            </form>
          </div>

          {/* TABLA / LISTADO DE ALERTAS */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-md font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex justify-between items-center">
              <span>Alertas Registradas en PostgreSQL</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-semibold">
                Total: {alertas.length}
              </span>
            </h3>

            {alertas.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                No hay alertas registradas todavía. ¡Crea una en el formulario!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase bg-gray-50">
                      <th className="p-3">Título</th>
                      <th className="p-3">Descripción</th>
                      <th className="p-3">Nivel</th>
                      <th className="p-3">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {alertas.map((alerta) => (
                      <tr key={alerta.id} className="hover:bg-gray-50 transition">
                        <td className="p-3 font-semibold text-gray-800">{alerta.titulo}</td>
                        <td className="p-3 text-gray-600 max-w-xs truncate">{alerta.descripcion}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            alerta.nivel === 'Alto' ? 'bg-red-100 text-red-700' :
                            alerta.nivel === 'Medio' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {alerta.nivel}
                          </span>
                        </td>
                        <td className="p-3 text-xs text-gray-400">
                          {new Date(alerta.fecha_creacion).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Modulo01;