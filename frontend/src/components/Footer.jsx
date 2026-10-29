import React from 'react';
import { Building2 } from 'lucide-react';

function Footer() {
  return (
    <footer className="sia-footer">
      <div className="sia-footer-brand">
        <Building2 size={16} className="text-[#691C32] shrink-0" />
        <div className="flex items-center gap-2">
          <span className="sia-footer-title">ANAM</span>
          <span className="text-gray-400">|</span>
          <span className="sia-footer-subtitle">SISTEMA DE INCIDENCIAS Y ALERTAS (SIA)</span>
        </div>
      </div>
      
      <p className="sia-footer-copyright">
        © 2026 Todos los derechos reservados
      </p>
    </footer>
  );
}

export default Footer;