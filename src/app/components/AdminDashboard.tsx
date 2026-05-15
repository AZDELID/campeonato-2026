import { useState } from 'react';
import { LogOut, UserPlus, Users, Calendar, Trash2, Edit2, X, Check, History, ChevronDown } from 'lucide-react';
import { useAuthSupabase as useAuth } from '../hooks/useAuthSupabase';
import { useMembers, Member } from '../hooks/useMembers';
import { SuperUserPanel } from './SuperUserPanel';

const FUTBOL_POSITIONS = [
  'No designado', 'Arquero', 'Defensa Central', 'Lateral Derecho',
  'Lateral Izquierdo', 'Centro Campista', 'Extremo Derecho',
  'Extremo Izquierdo', 'Delantero', 'DT'
];

export function AdminDashboard() {
  const { user, logout } = useAuth();

  // Si es super_user (pablo), mostrar panel especial
  if (user?.role === 'super_user') {
    return <SuperUserPanel />;
  }

  const discipline = user?.role === 'super_admin' ? undefined : user?.discipline;
  const { members, addMember, updateMember, quickUpdateFutbol, deleteMember, recordAttendance, getAttendanceForMember } = useMembers(discipline);

  const [activeTab, setActiveTab] = useState<'members' | 'attendance' | 'history'>('members');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newMember, setNewMember] = useState({ name: '', semester: '', discipline: user?.discipline || '', position: 'No designado', status: 'Suplente' as 'Suplente' | 'Seleccionado' });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const isFutbol = newMember.discipline === 'Futbol';
    await addMember(
      newMember.name,
      newMember.semester,
      newMember.discipline,
      isFutbol ? newMember.position : undefined,
      newMember.status
    );
    setNewMember({ name: '', semester: '', discipline: user?.discipline || '', position: 'No designado', status: 'Suplente' });
    setShowAddForm(false);
  };

  const handleUpdateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      const isFutbol = editingMember.discipline === 'Futbol';
      await updateMember(
        editingMember.id,
        editingMember.name,
        editingMember.semester,
        isFutbol ? editingMember.position : undefined,
        editingMember.status
      );
      setEditingMember(null);
    }
  };

  const handleAttendanceToggle = async (memberId: string, present: boolean) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
      await recordAttendance(memberId, selectedDate, present, member.discipline);
    }
  };

  const getAttendanceStatus = (memberId: string): boolean | undefined => {
    const member = members.find(m => m.id === memberId);
    if (!member) return undefined;

    const allAttendances = getAttendanceForMember(memberId);
    const todayAttendance = allAttendances.find(a => a.trainingDate === selectedDate);
    return todayAttendance?.present;
  };

  const disciplines = user?.role === 'super_admin'
    ? ['Vóley', 'Futbol', 'Ajedrez', 'Drill', 'Básquet', 'Atletismos', 'Karate']
    : [user?.discipline || ''];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
                Panel Administrativo
              </h1>
              <p className="text-gray-400 mt-1">
                {user?.role === 'super_admin' ? 'Super Administrador' : `Admin - ${user?.discipline}`}
              </p>
            </div>
            <button
              onClick={logout}
              className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 min-w-[120px] py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'members'
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Integrantes
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex-1 min-w-[120px] py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'attendance'
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Calendar className="w-5 h-5 inline mr-2" />
            Asistencia
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 min-w-[120px] py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <History className="w-5 h-5 inline mr-2" />
            Historial
          </button>
        </div>

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-yellow-400">Gestión de Integrantes</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all"
              >
                <UserPlus className="w-5 h-5" />
                Agregar Integrante
              </button>
            </div>

            {/* Add Member Form */}
            {showAddForm && (
              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-yellow-400">Nuevo Integrante</h3>
                  <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleAddMember} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-500"
                    required
                  />
                  <select
                    value={newMember.semester}
                    onChange={(e) => setNewMember({ ...newMember, semester: e.target.value })}
                    className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-500"
                    required
                  >
                    <option value="">Seleccionar semestre</option>
                    <option value="I">I</option>
                    <option value="III">III</option>
                    <option value="V">V</option>
                    <option value="VII">VII</option>
                    <option value="IX">IX</option>
                  </select>
                  {user?.role === 'super_admin' && (
                    <select
                      value={newMember.discipline}
                      onChange={(e) => setNewMember({ ...newMember, discipline: e.target.value })}
                      className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-500"
                      required
                    >
                      <option value="">Seleccionar disciplina</option>
                      {disciplines.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  )}
                  {(user?.discipline === 'Futbol' || (user?.role === 'super_admin' && newMember.discipline === 'Futbol')) && (
                    <select
                      value={newMember.position}
                      onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                      className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-500"
                    >
                      <option value="No designado">No designado</option>
                      <option value="Arquero">Arquero</option>
                      <option value="Defensa Central">Defensa Central</option>
                      <option value="Lateral Derecho">Lateral Derecho</option>
                      <option value="Lateral Izquierdo">Lateral Izquierdo</option>
                      <option value="Centro Campista">Centro Campista</option>
                      <option value="Extremo Derecho">Extremo Derecho</option>
                      <option value="Extremo Izquierdo">Extremo Izquierdo</option>
                      <option value="Delantero">Delantero</option>
                      <option value="DT">DT</option>
                    </select>
                  )}
                  <div className="flex items-center justify-between bg-black/40 border border-gray-700 rounded-lg py-3 px-4">
                    <span className="text-white font-medium">Estado:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setNewMember({ ...newMember, status: 'Suplente' })}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          newMember.status === 'Suplente'
                            ? 'bg-yellow-500 text-black'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                      >
                        Suplente
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewMember({ ...newMember, status: 'Seleccionado' })}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          newMember.status === 'Seleccionado'
                            ? 'bg-green-500 text-black'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                      >
                        Seleccionado
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 rounded-lg transition-all"
                  >
                    Guardar Integrante
                  </button>
                </form>
              </div>
            )}

            {/* Members List */}
            <div className="space-y-4">
              {members.length === 0 ? (
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center text-gray-400">
                  No hay integrantes registrados
                </div>
              ) : (
                members.map(member => (
                  <div key={member.id} className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-4">
                    {editingMember?.id === member.id ? (
                      <form onSubmit={handleUpdateMember} className="space-y-3">
                        <input
                          type="text"
                          value={editingMember.name}
                          onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                          className="w-full bg-black/40 border border-gray-700 rounded-lg py-2 px-3 text-white"
                          placeholder="Nombre completo"
                          required
                        />
                        <select
                          value={editingMember.semester}
                          onChange={(e) => setEditingMember({ ...editingMember, semester: e.target.value })}
                          className="w-full bg-black/40 border border-gray-700 rounded-lg py-2 px-3 text-white"
                          required
                        >
                          <option value="">Seleccionar semestre</option>
                          <option value="I">I</option>
                          <option value="III">III</option>
                          <option value="V">V</option>
                          <option value="VII">VII</option>
                          <option value="IX">IX</option>
                        </select>
                        {editingMember.discipline === 'Futbol' && (
                          <select
                            value={editingMember.position || 'No designado'}
                            onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
                            className="w-full bg-black/40 border border-gray-700 rounded-lg py-2 px-3 text-white"
                          >
                            {FUTBOL_POSITIONS.map(pos => (
                              <option key={pos} value={pos}>{pos}</option>
                            ))}
                          </select>
                        )}
                        <div className="flex rounded-lg overflow-hidden border border-gray-700">
                          <button
                            type="button"
                            onClick={() => setEditingMember({ ...editingMember, status: 'Suplente' })}
                            className={`flex-1 py-2 text-sm font-bold transition-all ${
                              editingMember.status === 'Suplente' || !editingMember.status
                                ? 'bg-yellow-500 text-black'
                                : 'bg-black/40 text-gray-400 hover:bg-gray-700'
                            }`}
                          >
                            Suplente
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingMember({ ...editingMember, status: 'Seleccionado' })}
                            className={`flex-1 py-2 text-sm font-bold transition-all ${
                              editingMember.status === 'Seleccionado'
                                ? 'bg-green-500 text-black'
                                : 'bg-black/40 text-gray-400 hover:bg-gray-700'
                            }`}
                          >
                            Seleccionado
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
                            Guardar
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingMember(null)}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                            <p className="text-sm text-gray-400">Semestre: {member.semester}</p>
                            {user?.role === 'super_admin' && (
                              <p className="text-sm text-yellow-500">{member.discipline}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingMember(member)}
                              className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 p-2 rounded-lg"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`¿Eliminar a ${member.name}?`)) {
                                  deleteMember(member.id);
                                }
                              }}
                              className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 p-2 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Controles rápidos de estado (todas las disciplinas) */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <div className="flex rounded-lg overflow-hidden border border-gray-700">
                            <button
                              onClick={() => quickUpdateFutbol(member.id, 'status', 'Suplente')}
                              className={`px-3 py-1.5 text-xs font-bold transition-all ${
                                member.status === 'Suplente' || !member.status
                                  ? 'bg-yellow-500 text-black'
                                  : 'bg-black/40 text-gray-400 hover:bg-gray-700'
                              }`}
                            >
                              Suplente
                            </button>
                            <button
                              onClick={() => quickUpdateFutbol(member.id, 'status', 'Seleccionado')}
                              className={`px-3 py-1.5 text-xs font-bold transition-all ${
                                member.status === 'Seleccionado'
                                  ? 'bg-green-500 text-black'
                                  : 'bg-black/40 text-gray-400 hover:bg-gray-700'
                              }`}
                            >
                              Seleccionado
                            </button>
                          </div>

                          {/* Selector de posición rápido (solo Fútbol) */}
                          {member.discipline === 'Futbol' && (
                            <div className="relative flex-1 min-w-[150px]">
                              <select
                                value={member.position || 'No designado'}
                                onChange={(e) => quickUpdateFutbol(member.id, 'position', e.target.value)}
                                className="w-full appearance-none bg-black/40 border border-gray-700 rounded-lg py-1.5 pl-3 pr-8 text-xs text-blue-300 font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
                              >
                                {FUTBOL_POSITIONS.map(pos => (
                                  <option key={pos} value={pos}>{pos}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-yellow-400 mb-4">Fecha del Entrenamiento</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="space-y-4">
              {members.length === 0 ? (
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center text-gray-400">
                  No hay integrantes para registrar asistencia
                </div>
              ) : (
                members.map(member => {
                  const isPresent = getAttendanceStatus(member.id);
                  return (
                    <div key={member.id} className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                        <p className="text-sm text-gray-400">{member.semester}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAttendanceToggle(member.id, true)}
                          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                            isPresent === true
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                          }`}
                        >
                          <Check className="w-5 h-5 inline mr-1" />
                          Presente
                        </button>
                        <button
                          onClick={() => handleAttendanceToggle(member.id, false)}
                          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                            isPresent === false
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                          }`}
                        >
                          <X className="w-5 h-5 inline mr-1" />
                          Ausente
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
              <History className="w-6 h-6" />
              Historial Completo de Asistencias
            </h2>

            {members.length === 0 ? (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center text-gray-400">
                No hay integrantes registrados
              </div>
            ) : (() => {
              // Obtener todas las fechas únicas de entrenamientos
              const allDates = new Set<string>();
              members.forEach(member => {
                const attendances = getAttendanceForMember(member.id);
                attendances.forEach(a => allDates.add(a.trainingDate));
              });

              const sortedDates = Array.from(allDates).sort((a, b) =>
                new Date(b).getTime() - new Date(a).getTime()
              );

              if (sortedDates.length === 0) {
                return (
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center text-gray-400">
                    No hay registros de asistencia
                  </div>
                );
              }

              return (
                <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-2xl p-6 overflow-x-auto">
                  <table className="w-full border-collapse min-w-max">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="sticky left-0 bg-gradient-to-br from-gray-900 to-black z-10 text-left p-4 font-bold text-yellow-400 min-w-[200px]">
                          Integrante
                        </th>
                        {sortedDates.map(date => (
                          <th key={date} className="text-center p-4 font-semibold text-gray-300 min-w-[120px]">
                            <div className="text-xs text-gray-400">
                              {new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}
                            </div>
                            <div className="text-sm">
                              {new Date(date).toLocaleDateString('es-ES', { weekday: 'short' })}
                            </div>
                          </th>
                        ))}
                        <th className="text-center p-4 font-bold text-yellow-400 min-w-[100px]">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map(member => {
                        const attendances = getAttendanceForMember(member.id);
                        const attendanceMap = new Map(
                          attendances.map(a => [a.trainingDate, a.present])
                        );
                        const totalPresent = attendances.filter(a => a.present).length;
                        const totalSessions = sortedDates.length;
                        const attendancePercentage = totalSessions > 0
                          ? Math.round((totalPresent / totalSessions) * 100)
                          : 0;

                        return (
                          <tr key={member.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                            <td className="sticky left-0 bg-gradient-to-br from-gray-900 to-black z-10 p-4 border-r border-gray-700">
                              <div>
                                <p className="font-semibold text-white text-sm">{member.name}</p>
                                <p className="text-xs text-gray-400">{member.semester}</p>
                                {user?.role === 'super_admin' && (
                                  <p className="text-xs text-yellow-500 mt-1">{member.discipline}</p>
                                )}
                              </div>
                            </td>
                            {sortedDates.map(date => {
                              const status = attendanceMap.get(date);
                              return (
                                <td key={date} className="text-center p-4">
                                  {status === undefined ? (
                                    <div className="w-8 h-8 mx-auto rounded-full bg-gray-700/30 flex items-center justify-center">
                                      <span className="text-gray-600 text-xs">-</span>
                                    </div>
                                  ) : status ? (
                                    <div className="w-8 h-8 mx-auto rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                                      <Check className="w-5 h-5 text-green-400" />
                                    </div>
                                  ) : (
                                    <div className="w-8 h-8 mx-auto rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                                      <X className="w-5 h-5 text-red-400" />
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                            <td className="text-center p-4">
                              <div className="flex flex-col items-center gap-1">
                                <span className={`text-lg font-bold ${
                                  attendancePercentage >= 80 ? 'text-green-400' :
                                  attendancePercentage >= 60 ? 'text-yellow-400' : 'text-red-400'
                                }`}>
                                  {attendancePercentage}%
                                </span>
                                <span className="text-xs text-gray-400">
                                  {totalPresent}/{totalSessions}
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-6 justify-center mt-6 pt-6 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-sm text-gray-300">Asistió</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-400" />
                      </div>
                      <span className="text-sm text-gray-300">Faltó</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-700/30 flex items-center justify-center">
                        <span className="text-gray-600 text-xs">-</span>
                      </div>
                      <span className="text-sm text-gray-300">Sin registro</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
