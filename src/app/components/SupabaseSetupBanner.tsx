import { useState } from 'react';
import { AlertTriangle, Database, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

export function SupabaseSetupBanner() {
  const [isConfigured] = useState(isSupabaseConfigured());
  const [isExpanded, setIsExpanded] = useState(!isConfigured);

  if (isConfigured) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-400">
              ✅ Supabase Configurado
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Los datos se guardan permanentemente en la nube
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-left w-full"
          >
            <p className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
              ⚠️ Supabase No Configurado - Los datos se perderán al recargar
              <span className="text-xs">{isExpanded ? '▼' : '▶'}</span>
            </p>
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-3">
              <p className="text-xs text-gray-300">
                Actualmente los datos se guardan en <strong>localStorage</strong>, que se borra al:
              </p>
              <ul className="text-xs text-gray-400 space-y-1 ml-4">
                <li>• Usar modo incógnito</li>
                <li>• Limpiar caché del navegador</li>
                <li>• Cambiar de navegador o dispositivo</li>
              </ul>

              <div className="bg-black/40 rounded-lg p-3 border border-yellow-600/30">
                <p className="text-xs font-semibold text-white mb-2">
                  🚀 Solución: Configurar Supabase (5 minutos)
                </p>
                <ol className="text-xs text-gray-300 space-y-2">
                  <li>1. Crea cuenta gratis en <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline inline-flex items-center gap-1">supabase.com <ExternalLink className="w-3 h-3" /></a></li>
                  <li>2. Crea un nuevo proyecto</li>
                  <li>3. Ejecuta el SQL de <code className="bg-black/60 px-1 rounded text-yellow-400">supabase/migrations/001_create_tables.sql</code></li>
                  <li>4. Copia las credenciales al archivo <code className="bg-black/60 px-1 rounded text-yellow-400">.env</code></li>
                  <li>5. Reinicia el servidor</li>
                </ol>

                <a
                  href="/CONFIGURAR_SUPABASE.md"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-bold px-3 py-2 rounded-lg mt-3 transition-all"
                >
                  <Database className="w-4 h-4" />
                  Ver Guía Completa
                </a>
              </div>

              <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="text-blue-400 text-xs">
                  <p className="font-semibold mb-1">💡 Mientras tanto:</p>
                  <p className="text-gray-400">
                    Puedes usar la aplicación normalmente, pero NO cierres la pestaña ni recargues la página, o perderás todos los datos.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SupabaseStatusIndicator() {
  const [isConfigured] = useState(isSupabaseConfigured());

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`rounded-full px-3 py-1 flex items-center gap-2 text-xs font-semibold shadow-lg ${
        isConfigured
          ? 'bg-green-500/20 border border-green-500/50 text-green-400'
          : 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
      }`}>
        {isConfigured ? (
          <>
            <Database className="w-3 h-3" />
            Supabase ON
          </>
        ) : (
          <>
            <XCircle className="w-3 h-3" />
            localStorage
          </>
        )}
      </div>
    </div>
  );
}
