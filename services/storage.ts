import { Participant, Team } from '../types';
import { STORAGE_KEY } from '../constants';

export const saveParticipant = (participant: Participant): void => {
  const existingDataStr = localStorage.getItem(STORAGE_KEY);
  let participants: Participant[] = [];
  
  if (existingDataStr) {
    try {
      participants = JSON.parse(existingDataStr);
    } catch (e) {
      console.error("Failed to parse storage", e);
      participants = [];
    }
  }

  participants.push(participant);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
};

export const getParticipants = (): Participant[] => {
  const existingDataStr = localStorage.getItem(STORAGE_KEY);
  if (!existingDataStr) return [];
  try {
    return JSON.parse(existingDataStr);
  } catch (e) {
    return [];
  }
};

export const deleteParticipant = (id: string): void => {
  const participants = getParticipants();
  const updatedParticipants = participants.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedParticipants));
};

export const determineTeam = (scoreA: number, scoreB: number): Team => {
  if (scoreA >= scoreB) {
    return Team.A; // Tie-breaker goes to A by default
  }
  return Team.B;
};