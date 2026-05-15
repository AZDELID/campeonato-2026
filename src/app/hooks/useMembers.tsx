import { useState, useEffect } from 'react';
import {
  dbGetMembers,
  dbAddMember,
  dbUpdateMember,
  dbDeleteMember,
  dbGetAttendances,
  dbRecordAttendance,
  dbDeleteMemberAttendances
} from '../services/database';

export interface Member {
  id: string;
  name: string;
  semester: string;
  discipline: string;
  position?: string; // Solo para Fútbol
  status?: 'Suplente' | 'Seleccionado'; // Solo para Fútbol
  createdAt: string;
}

export interface Attendance {
  id: string;
  memberId: string;
  trainingDate: string;
  present: boolean;
  discipline: string;
}

export function useMembers(discipline?: string) {
  const [members, setMembers] = useState<Member[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const allMembers = await dbGetMembers();
      if (discipline) {
        setMembers(allMembers.filter((m: Member) => m.discipline === discipline));
      } else {
        setMembers(allMembers);
      }

      const allAttendances = await dbGetAttendances();
      if (discipline) {
        setAttendances(allAttendances.filter((a: Attendance) => a.discipline === discipline));
      } else {
        setAttendances(allAttendances);
      }
    };

    loadData();
  }, [discipline]);

  const addMember = async (name: string, semester: string, disciplineName: string, position?: string, status?: 'Suplente' | 'Seleccionado') => {
    const newMember: Member = {
      id: crypto.randomUUID(),
      name,
      semester,
      discipline: disciplineName,
      position,
      status,
      createdAt: new Date().toISOString()
    };

    await dbAddMember(newMember);

    if (!discipline || discipline === disciplineName) {
      setMembers(prev => [...prev, newMember]);
    }
  };

  const updateMember = async (id: string, name: string, semester: string, position?: string, status?: 'Suplente' | 'Seleccionado') => {
    const updates: Partial<Member> = { name, semester };
    if (position !== undefined) updates.position = position;
    if (status !== undefined) updates.status = status;

    await dbUpdateMember(id, updates);
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const quickUpdateFutbol = async (id: string, field: 'position' | 'status', value: string) => {
    await dbUpdateMember(id, { [field]: value } as Partial<Member>);
    setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const deleteMember = async (id: string) => {
    await dbDeleteMember(id);
    setMembers(prev => prev.filter(m => m.id !== id));

    await dbDeleteMemberAttendances(id);
    setAttendances(prev => prev.filter(a => a.memberId !== id));
  };

  const recordAttendance = async (memberId: string, trainingDate: string, present: boolean, disciplineName: string) => {
    const newAttendance: Attendance = {
      id: crypto.randomUUID(),
      memberId,
      trainingDate,
      present,
      discipline: disciplineName
    };

    await dbRecordAttendance(newAttendance);

    // Actualizar estado local
    const allAttendances = await dbGetAttendances();
    if (!discipline || discipline === disciplineName) {
      setAttendances(allAttendances.filter(a => !discipline || a.discipline === discipline));
    }
  };

  const getAttendanceForMember = (memberId: string): Attendance[] => {
    return attendances.filter(a => a.memberId === memberId);
  };

  return {
    members,
    attendances,
    addMember,
    updateMember,
    quickUpdateFutbol,
    deleteMember,
    recordAttendance,
    getAttendanceForMember
  };
}
