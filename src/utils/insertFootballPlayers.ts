// Script to insert initial 32 Football players into database
// Run this once to populate the Football team

import footballData from '../../football_players_data.json';
import { dbGetMembers, dbDeleteMember, dbAddMember } from '../app/services/database';
import type { Member } from '../app/hooks/useMembers';

export async function insertFootballPlayers() {
  try {
    // Get existing members from database
    const existingMembers = await dbGetMembers();

    // Delete existing Football players to avoid duplicates
    const footballMembers = existingMembers.filter((m: Member) => m.discipline === 'Futbol');
    for (const member of footballMembers) {
      await dbDeleteMember(member.id);
    }

    // Insert new football players
    for (const player of footballData) {
      await dbAddMember(player as Member);
    }

    console.log(`✅ Successfully inserted ${footballData.length} Football players`);
    return footballData.length;
  } catch (error) {
    console.error('Error inserting football players:', error);
    throw error;
  }
}
