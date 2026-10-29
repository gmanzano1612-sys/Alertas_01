import { useState } from 'react';
import axios from 'axios';
import BackgroundNodes from './BackgroundNodes'; // <-- 1. Importas el componente
import { Eye, EyeOff } from "lucide-react";


function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });
      const newToken = response.data.token;
      
      // Guardamos el token en localStorage para que persista al recargar la página
      localStorage.setItem('token', newToken);
      
      setToken(newToken);
    } catch (err) {
      setError('Credenciales inválidas. Verifica tu usuario y contraseña.');
    }
  };

  return (
    <div className="relative w-screen min-h-screen flex flex-col justify-center items-center bg-[#f5f3f4] overflow-hidden">
      
      {/* 2. Llamas al fondo reutilizable */}
      <BackgroundNodes />

      {/* Tarjeta de Login (con z-index superior) */}
      <div className="relative z-10 w-full max-w-[380px] px-5 box-border">
        <div className="bg-white rounded-2xl p-[35px_30px_25px_30px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] text-center">
          <div className="flex justify-center items-center gap-3 mb-4.5">
            <img
                src="logo.png"
                alt="Logo Aduanas"
                className="w-20 h-20 object-contain"
            />
            </div>

          <div className="inline-block bg-[#691C32] text-white text-[10px] font-bold px-3.5 py-0.5 rounded-xl tracking-wider mb-2.5">
            ALERTAS SIA
          </div>

          <p className="text-[11px] text-gray-600 mb-5">
            Sistema de Incidencias y Alertas
          </p>

          {error && (
            <p className="text-red-500 text-xs mb-4">{error}</p>
          )}

          <form onSubmit={handleLogin} className="text-left">
            <div className="mb-3.5">
              <label className="block text-[10px] font-bold text-gray-600 mb-1 tracking-wide">
                USUARIO
              </label>
              <input
                type="text"
                placeholder="correo@ejemplo.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-2.5 text-[13px] border border-gray-200 rounded-md bg-[#fcfcfc] outline-none box-border focus:ring-2 focus:ring-[#691C32]"
              />
            </div>

            <div className="mb-3.5">
              <label className="block text-[10px] font-bold text-gray-600 mb-1 tracking-wide">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2.5 pr-9 text-[13px] border border-gray-200 rounded-md bg-[#fcfcfc] outline-none box-border focus:ring-2 focus:ring-[#691C32]"
                />
                
                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.8} />
                ) : (
                    <Eye size={18} strokeWidth={1.8} />
                )}
                </button>

              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 cursor-pointer"
              />
              <label htmlFor="remember" className="text-[11px] text-gray-600 cursor-pointer">
                Recordar sesión
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#691C32] text-white border-none rounded-[20px] font-bold text-xs cursor-pointer tracking-wider hover:bg-[#521527] transition"
            >
              INICIAR SESIÓN
            </button>
          </form>

          <div className="mt-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-gray-600 no-underline">
              ¿No tienes cuenta? <span className="font-bold text-gray-800">Regístrate aquí</span>
            </a>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-5">
          © 2026 - Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

export default Login;