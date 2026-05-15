/**
 * Capa de abstracción de base de datos
 * Funciona con Supabase cuando está configurado, fallback a localStorage
 */

import { Member, Attendance } from '../hooks/useMembers';
import { supabase, isSupabaseConfigured, DatabaseMember, DatabaseAttendance } from '../../lib/supabase';

// Verificar si Supabase está disponible y configurado
const isSupabaseAvailable = (): boolean => {
  return isSupabaseConfigured();
};

// Funciones para Members
export const dbGetMembers = async (): Promise<Member[]> => {
  if (isSupabaseAvailable()) {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching members from Supabase:', error);
      return [];
    }

    return (data as DatabaseMember[]).map(m => ({
      id: m.id,
      name: m.name,
      semester: m.semester,
      discipline: m.discipline,
      position: m.position,
      status: m.status,
      createdAt: m.created_at
    }));
  }

  // Usar localStorage
  const saved = localStorage.getItem('members');
  return saved ? JSON.parse(saved) : [];
};

export const dbSaveMembers = async (members: Member[]): Promise<void> => {
  if (isSupabaseAvailable()) {
    // No se usa directamente con Supabase, usamos operaciones individuales
    console.warn('dbSaveMembers: Usar operaciones individuales (add/update/delete) con Supabase');
    return;
  }

  // Usar localStorage
  localStorage.setItem('members', JSON.stringify(members));
};

export const dbAddMember = async (member: Member): Promise<void> => {
  if (isSupabaseAvailable()) {
    const { error } = await supabase
      .from('members')
      .insert({
        id: member.id,
        name: member.name,
        semester: member.semester,
        discipline: member.discipline,
        position: member.position,
        status: member.status
      });

    if (error) {
      console.error('Error adding member to Supabase:', error);
      throw error;
    }
    return;
  }

  // Usar localStorage
  const members = await dbGetMembers();
  members.push(member);
  await dbSaveMembers(members);
};

export const dbUpdateMember = async (id: string, updates: Partial<Member>): Promise<void> => {
  if (isSupabaseAvailable()) {
    const updateData: Partial<DatabaseMember> = {
      updated_at: new Date().toISOString()
    };

    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.semester !== undefined) updateData.semester = updates.semester;
    if (updates.discipline !== undefined) updateData.discipline = updates.discipline;
    if (updates.position !== undefined) updateData.position = updates.position;
    if (updates.status !== undefined) updateData.status = updates.status;

    const { error } = await supabase
      .from('members')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating member in Supabase:', error);
      throw error;
    }
    return;
  }

  // Usar localStorage
  const members = await dbGetMembers();
  const updated = members.map(m => m.id === id ? { ...m, ...updates } : m);
  await dbSaveMembers(updated);
};

export const dbDeleteMember = async (id: string): Promise<void> => {
  if (isSupabaseAvailable()) {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting member from Supabase:', error);
      throw error;
    }
    return;
  }

  // Usar localStorage
  const members = await dbGetMembers();
  const updated = members.filter(m => m.id !== id);
  await dbSaveMembers(updated);
};

// Funciones para Attendances
export const dbGetAttendances = async (): Promise<Attendance[]> => {
  if (isSupabaseAvailable()) {
    const { data, error } = await supabase
      .from('attendances')
      .select('*')
      .order('training_date', { ascending: false });

    if (error) {
      console.error('Error fetching attendances from Supabase:', error);
      return [];
    }

    return (data as DatabaseAttendance[]).map(a => ({
      id: a.id,
      memberId: a.member_id,
      trainingDate: a.training_date,
      present: a.present,
      discipline: a.discipline
    }));
  }

  // Usar localStorage
  const saved = localStorage.getItem('attendances');
  return saved ? JSON.parse(saved) : [];
};

export const dbSaveAttendances = async (attendances: Attendance[]): Promise<void> => {
  if (isSupabaseAvailable()) {
    // No se usa directamente con Supabase, usamos operaciones individuales
    console.warn('dbSaveAttendances: Usar operaciones individuales (record/delete) con Supabase');
    return;
  }

  // Usar localStorage
  localStorage.setItem('attendances', JSON.stringify(attendances));
};

export const dbRecordAttendance = async (attendance: Attendance): Promise<void> => {
  if (isSupabaseAvailable()) {
    // Verificar si ya existe un registro para este miembro y fecha
    const { data: existing } = await supabase
      .from('attendances')
      .select('id')
      .eq('member_id', attendance.memberId)
      .eq('training_date', attendance.trainingDate)
      .single();

    if (existing) {
      // Actualizar registro existente
      const { error } = await supabase
        .from('attendances')
        .update({
          present: attendance.present,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (error) {
        console.error('Error updating attendance in Supabase:', error);
        throw error;
      }
    } else {
      // Crear nuevo registro
      const { error } = await supabase
        .from('attendances')
        .insert({
          id: attendance.id,
          member_id: attendance.memberId,
          training_date: attendance.trainingDate,
          present: attendance.present,
          discipline: attendance.discipline
        });

      if (error) {
        console.error('Error recording attendance in Supabase:', error);
        throw error;
      }
    }
    return;
  }

  // Usar localStorage
  const attendances = await dbGetAttendances();
  const existingIndex = attendances.findIndex(
    a => a.memberId === attendance.memberId && a.trainingDate === attendance.trainingDate
  );

  if (existingIndex >= 0) {
    attendances[existingIndex] = attendance;
  } else {
    attendances.push(attendance);
  }

  await dbSaveAttendances(attendances);
};

export const dbDeleteMemberAttendances = async (memberId: string): Promise<void> => {
  if (isSupabaseAvailable()) {
    const { error } = await supabase
      .from('attendances')
      .delete()
      .eq('member_id', memberId);

    if (error) {
      console.error('Error deleting member attendances from Supabase:', error);
      throw error;
    }
    return;
  }

  // Usar localStorage
  const attendances = await dbGetAttendances();
  const updated = attendances.filter(a => a.memberId !== memberId);
  await dbSaveAttendances(updated);
};
