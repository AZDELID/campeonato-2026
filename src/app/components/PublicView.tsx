import { useState } from 'react';
import { Users, ChevronDown, Eye } from 'lucide-react';
import { useMembers } from '../hooks/useMembers';

const allDisciplines = ['Vóley', 'Futbol', 'Ajedrez', 'Drill', 'Básquet', 'Atletismos', 'Karate'];

export function PublicView() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const { members } = useMembers(selectedDiscipline || undefined);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
          <Eye className="w-6 h-6" />
          Ver Integrantes
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Selecciona una disciplina para ver su lista de integrantes
        </p>

        {/* Discipline Selector */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 px-4 text-white flex justify-between items-center hover:border-yellow-500 transition-colors"
          >
            <span className={selectedDiscipline ? 'text-white' : 'text-gray-400'}>
              {selectedDiscipline || 'Seleccionar disciplina...'}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-2xl z-10">
              {allDisciplines.map(discipline => (
                <button
                  key={discipline}
                  onClick={() => {
                    setSelectedDiscipline(discipline);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-yellow-500/20 transition-colors ${
                    selectedDiscipline === discipline ? 'bg-yellow-500/10 text-yellow-400' : 'text-white'
                  }`}
                >
                  {discipline}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Members List */}
      {selectedDiscipline && (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Integrantes de {selectedDiscipline}
          </h3>

          {members.length === 0 ? (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center text-gray-400">
              No hay integrantes registrados en esta disciplina
            </div>
          ) : selectedDiscipline === 'Futbol' ? (
            /* Grouped view for Football */
            (() => {
              const positions = [
                'Arquero',
                'Defensa Central',
                'Lateral Derecho',
                'Lateral Izquierdo',
                'Centro Campista',
                'Extremo Derecho',
                'Extremo Izquierdo',
                'Delantero',
                'DT',
                'No designado'
              ];

              const membersByPosition = positions.reduce((acc, pos) => {
                acc[pos] = members.filter(m => (m.position || 'No designado') === pos);
                return acc;
              }, {} as Record<string, typeof members>);

              return (
                <div className="space-y-6">
                  {positions.map(position => {
                    const positionMembers = membersByPosition[position];
                    if (positionMembers.length === 0) return null;

                    return (
                      <div key={position} className="space-y-3">
                        <h4 className="text-lg font-bold text-yellow-400 border-b border-yellow-600/30 pb-2">
                          {position}
                        </h4>
                        {positionMembers.map((member, index) => (
                          <div
                            key={member.id}
                            className="bg-black/40 border border-gray-700 rounded-lg p-4 hover:border-yellow-600/50 transition-colors"
                          >
                            <div className="flex items-start gap-4">
                              <div className="bg-yellow-500/20 rounded-full w-10 h-10 flex items-center justify-center text-yellow-400 font-bold flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                                  {member.status && (
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                      member.status === 'Seleccionado'
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                                    }`}>
                                      {member.status}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-400">Semestre: {member.semester}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })()
          ) : (
            /* Regular list view for other disciplines */
            <div className="space-y-3">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  className="bg-black/40 border border-gray-700 rounded-lg p-4 hover:border-yellow-600/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 rounded-full w-10 h-10 flex items-center justify-center text-yellow-400 font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                      <p className="text-sm text-gray-400">Semestre: {member.semester}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-center text-xs text-gray-500">
            Total de integrantes: {members.length}
          </div>
        </div>
      )}
    </div>
  );
}
